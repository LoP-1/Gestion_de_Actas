import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpEvent, HttpEventType, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../enviroments/enviroment';

type FileStatus = 'pending' | 'uploading' | 'done' | 'error' | 'canceled';

interface QueueItem {
  file: File;
  progress: number; // 0-100
  status: FileStatus;
  // no mostramos el body en la UI; guardamos detalles sólo para logs/dev
  errorDetail?: any;
  sub?: Subscription | null;
}

@Component({
  selector: 'app-importar-csv',
  standalone: true,
  templateUrl: './importar.html',
  styleUrls: ['./importar.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule
  ]
})
export class ImportarCsvComponent {
  readonly uploadUrl = `${environment.apiUrl}/upload`;

  // Cola de archivos
  filesQueue: QueueItem[] = [];

  // Estado de la cola
  uploading = false;
  overallProgress = 0; // 0-100

  dragActive = false;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  // Input file multiple
  onFilesSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.addFiles(input.files);
    input.value = '';
  }

  // Drag & drop
  @HostListener('dragover', ['$event'])
  onDragOver(e: DragEvent) {
    e.preventDefault(); e.stopPropagation(); this.dragActive = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e: DragEvent) {
    e.preventDefault(); e.stopPropagation(); this.dragActive = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    e.preventDefault(); e.stopPropagation(); this.dragActive = false;
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      this.addFiles(files);
    }
  }

  // Agrega varios archivos a la cola (sin duplicados por nombre+size)
  addFiles(list: FileList | File[]) {
    const arr = Array.from(list);
    let added = 0;
    for (const f of arr) {
      if (!this.validateFile(f)) continue;
      // evitar duplicados exactos
      const exists = this.filesQueue.some(q => q.file.name === f.name && q.file.size === f.size);
      if (exists) continue;
      this.filesQueue.push({ file: f, progress: 0, status: 'pending', sub: null });
      added++;
    }
    if (added > 0) {
      this.snack.open(`${added} archivo(s) añadidos a la cola`, 'OK', { duration: 2000 });
    }
    this.computeOverallProgress();
  }

  // Validación igual que antes
  private validateFile(file: File): boolean {
    const isCsv = file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv';
    if (!isCsv) {
      this.snack.open('El archivo debe ser CSV (.csv).', 'Cerrar', { duration: 3000, panelClass: ['snack-error'] });
      return false;
    }
    const maxBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxBytes) {
      this.snack.open('El archivo excede el tamaño máximo (10 MB).', 'Cerrar', { duration: 3500, panelClass: ['snack-error'] });
      return false;
    }
    return true;
  }

  // Inicia la subida de la cola (si ya está subiendo, NO reinicia)
  startUploadQueue() {
    if (this.uploading) return;
    this.uploading = true;
    this.uploadNext();
  }

  // Sube el siguiente archivo pendiente en la cola
  private uploadNext() {
    // Antes buscábamos pending OR error — eso provocaba reintentos infinitos.
    // Ahora buscamos SOLO el siguiente 'pending' para avanzar siempre hacia archivos no procesados.
    const nextIndex = this.filesQueue.findIndex(i => i.status === 'pending');
    if (nextIndex === -1) {
      // cola terminada (no hay pendientes)
      this.uploading = false;
      this.computeOverallProgress();
      this.snack.open('Todos los archivos procesados', 'OK', { duration: 2000 });
      return;
    }
    const item = this.filesQueue[nextIndex];
    this.uploadItem(item, nextIndex);
  }

  private uploadItem(item: QueueItem, index: number) {
    const formData = new FormData();
    formData.append('file', item.file, item.file.name);

    const req = new HttpRequest('POST', this.uploadUrl, formData, { reportProgress: true });

    item.status = 'uploading';
    item.progress = 0;
    item.errorDetail = undefined;

    const sub = this.http.request(req)
      .pipe(finalize(() => {
        if (item.sub) { item.sub = null; }
      }))
      .subscribe({
        next: (event: HttpEvent<unknown>) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            item.progress = Math.round((100 * event.loaded) / event.total);
            this.computeOverallProgress();
          } else if (event.type === HttpEventType.Response) {
            // respuesta final: no exponer el body al usuario, solo marcar completado
            item.progress = 100;
            item.status = 'done';
            this.computeOverallProgress();

            // Log completo para desarrolladores (no se muestra al usuario)
            console.log('Upload response for', item.file.name, event.body);

            // continuar con el siguiente pendiente
            setTimeout(() => this.uploadNext(), 200);
          }
        },
        error: (err: HttpErrorResponse) => {
          // Guardamos detalle para debug (no se muestra en UI)
          item.errorDetail = err.error ?? err.message ?? err;
          // Marcamos como error y NO lo volvemos a poner automáticamente en 'pending'
          item.status = 'error';
          item.progress = 0;
          this.computeOverallProgress();

          // Mostrar mensaje breve al usuario
          this.snack.open(`Fallo al subir ${item.file.name}`, 'Cerrar', { duration: 4000, panelClass: ['snack-error'] });

          // Avanzar al siguiente archivo pendiente (si existe). No reintentar automáticamente este.
          setTimeout(() => this.uploadNext(), 300);
        }
      });

    item.sub = sub;
  }

  // Cancelar el upload en curso (si hay)
  cancelCurrent() {
    const uploadingItem = this.filesQueue.find(i => i.status === 'uploading');
    if (!uploadingItem) return;
    if (uploadingItem.sub) {
      uploadingItem.sub.unsubscribe();
    }
    uploadingItem.status = 'canceled';
    uploadingItem.progress = 0;
    uploadingItem.sub = null;
    this.uploading = false;
    this.computeOverallProgress();
    // continuar con el siguiente pendiente
    setTimeout(() => this.startUploadQueue(), 200);
  }

  // Remover un archivo de la cola
  removeFromQueue(idx: number) {
    const item = this.filesQueue[idx];
    if (!item) return;
    // si se está subiendo, cancela primero
    if (item.status === 'uploading' && item.sub) {
      item.sub.unsubscribe();
    }
    this.filesQueue.splice(idx, 1);
    this.computeOverallProgress();
  }

  // Reintentar un archivo con error(botoncito manual )
  retryItem(idx: number) {
    const item = this.filesQueue[idx];
    if (!item) return;
    if (item.status !== 'error' && item.status !== 'canceled') return;
    item.status = 'pending';
    item.progress = 0;
    item.errorDetail = undefined;
    // Si no está subiendo nada actualmente, iniciar cola
    if (!this.uploading) {
      this.startUploadQueue();
    }
  }

  // Computa progreso global como promedio de archivos
  private computeOverallProgress() {
    if (this.filesQueue.length === 0) {
      this.overallProgress = 0;
      return;
    }
    const sum = this.filesQueue.reduce((acc, cur) => acc + (cur.progress || 0), 0);
    this.overallProgress = Math.round(sum / this.filesQueue.length);
  }

  private extractErrorMessage(err: HttpErrorResponse): string {
    let msg = 'Error desconocido';
    if (err.error) {
      if (typeof err.error === 'string') {
        msg = err.error;
      } else if (typeof err.error === 'object') {
        msg = (err.error as any).message || (err.error as any).error || JSON.stringify(err.error);
      }
    } else if (err.message) {
      msg = err.message;
    }
    return msg;
  }

  // Limpia toda la cola (cancelando la actual si hay)
  clearQueue() {
    // cancelar cualquier subscripción
    for (const it of this.filesQueue) {
      if (it.sub) {
        it.sub.unsubscribe();
        it.sub = null;
      }
    }
    this.filesQueue = [];
    this.uploading = false;
    this.overallProgress = 0;
  }

  // Permite reabrir el selector desde el botón; no hace propagation en el template
  openFilePicker(inputEl: HTMLInputElement) {
    if (this.uploading) return;
    inputEl.value = ''; // permite seleccionar el mismo archivo de nuevo
    inputEl.click();
  }
}