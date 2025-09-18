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
  progress: number;
  status: FileStatus;
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
  // Modo: 'boleta' o 'beneficiario'
  modo: 'boleta' | 'beneficiario' = 'boleta';

  // Endpoints para cada modo
  get uploadUrl() {
    return this.modo === 'beneficiario'
      ? `${environment.apiUrl}/upload/beneficiario`
      : `${environment.apiUrl}/upload`;
  }

  // Cola de archivos
  filesQueue: QueueItem[] = [];
  uploading = false;
  overallProgress = 0; // 0-100
  dragActive = false;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  cambiarModo() {
    this.modo = this.modo === 'boleta' ? 'beneficiario' : 'boleta';
    this.filesQueue = [];
    this.uploading = false;
    this.overallProgress = 0;
    // Snack para avisar
    this.snack.open(
      this.modo === 'boleta' ? 'Modo: Importar Boletas' : 'Modo: Importar Beneficiarios',
      'OK', { duration: 1200 }
    );
  }

  onFilesSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.addFiles(input.files);
    input.value = '';
  }

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

  addFiles(list: FileList | File[]) {
    const arr = Array.from(list);
    let added = 0;
    for (const f of arr) {
      if (!this.validateFile(f)) continue;
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

  startUploadQueue() {
    if (this.uploading) return;
    this.uploading = true;
    this.uploadNext();
  }

  private uploadNext() {
    const nextIndex = this.filesQueue.findIndex(i => i.status === 'pending');
    if (nextIndex === -1) {
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
      .pipe(finalize(() => { item.sub = null; }))
      .subscribe({
        next: (event: HttpEvent<unknown>) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            // Solo avanzar hasta 98% (no 100) para evitar que la barra se complete antes de terminar el proceso
            const pct = Math.round((100 * event.loaded) / event.total);
            item.progress = pct >= 98 ? 98 : pct;
            this.computeOverallProgress();
          } else if (event.type === HttpEventType.Response) {
            // Cuando el proceso terminó realmente: ahora sí 100%
            item.progress = 100;
            item.status = 'done';
            this.computeOverallProgress();
            setTimeout(() => this.uploadNext(), 200);
          }
        },
        error: (err: HttpErrorResponse) => {
          item.errorDetail = err.error ?? err.message ?? err;
          item.status = 'error';
          item.progress = 0;
          this.computeOverallProgress();
          this.snack.open(`Fallo al subir ${item.file.name}`, 'Cerrar', { duration: 4000, panelClass: ['snack-error'] });
          setTimeout(() => this.uploadNext(), 300);
        }
      });
    item.sub = sub;
  }

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
    setTimeout(() => this.startUploadQueue(), 200);
  }

  removeFromQueue(idx: number) {
    const item = this.filesQueue[idx];
    if (!item) return;
    if (item.status === 'uploading' && item.sub) {
      item.sub.unsubscribe();
    }
    this.filesQueue.splice(idx, 1);
    this.computeOverallProgress();
  }

  retryItem(idx: number) {
    const item = this.filesQueue[idx];
    if (!item) return;
    if (item.status !== 'error' && item.status !== 'canceled') return;
    item.status = 'pending';
    item.progress = 0;
    item.errorDetail = undefined;
    if (!this.uploading) {
      this.startUploadQueue();
    }
  }

  // Progreso global: solo archivos completados (100%), se cuentan como terminados.
  private computeOverallProgress() {
    if (this.filesQueue.length === 0) {
      this.overallProgress = 0;
      return;
    }
    // Calcula como promedio de todos los archivos, pero la barra
    // solo llega a 100 si TODOS los archivos están status 'done'
    const sum = this.filesQueue.reduce((acc, cur) => acc + (cur.progress || 0), 0);
    const avg = Math.round(sum / this.filesQueue.length);
    // Si todos están en 100, muestra 100.
    if (this.filesQueue.every(i => i.status === 'done')) {
      this.overallProgress = 100;
    } else {
      // Si hay alguno pendiente/error, la barra global nunca llega a 100
      this.overallProgress = avg >= 98 ? 98 : avg;
    }
  }

  clearQueue() {
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

  openFilePicker(inputEl: HTMLInputElement) {
    if (this.uploading) return;
    inputEl.value = '';
    inputEl.click();
  }
}