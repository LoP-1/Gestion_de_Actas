import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpEvent, HttpEventType, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  // Ajusta si tu backend tiene otro host/puerto. Para mismo origen, /upload está bien.
  readonly uploadUrl = 'http://localhost:8080/upload';

  selectedFile: File | null = null;
  uploading = false;
  uploadProgress = 0;
  serverMessage = '';
  errorMessage = '';
  dragActive = false;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  // Abre el selector de archivos (soluciona que el botón no dispare el input dentro de label)
  openFilePicker(inputEl: HTMLInputElement) {
    if (this.uploading) return;
    // Permite re-seleccionar el mismo archivo
    inputEl.value = '';
    inputEl.click();
  }

  // Selección por input
  onFileSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.setFile(input.files[0]);
    // Limpia para permitir re-seleccionar el mismo archivo
    input.value = '';
  }

  // Drag & drop
  @HostListener('dragover', ['$event'])
  onDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragActive = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragActive = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragActive = false;
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      this.setFile(files[0]);
    }
  }

  private setFile(file: File) {
    this.serverMessage = '';
    this.errorMessage = '';
    if (!this.validateFile(file)) return;
    this.selectedFile = file;
  }

  private validateFile(file: File): boolean {
    const isCsv = file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv';
    if (!isCsv) {
      return this.fail('El archivo debe ser CSV (.csv).');
    }
    const maxBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxBytes) {
      return this.fail('El archivo excede el tamaño máximo (10 MB).');
    }
    return true;
  }

  subir() {
    if (!this.selectedFile || this.uploading) return;

    const formData = new FormData();
    // Debe llamarse "file" según @RequestParam("file")
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.uploading = true;
    this.uploadProgress = 0;
    this.serverMessage = '';
    this.errorMessage = '';

    const req = new HttpRequest('POST', this.uploadUrl, formData, { reportProgress: true });

    this.http.request(req).subscribe({
      next: (event: HttpEvent<unknown>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          const body = (event.body as any) ?? '';
          this.serverMessage = typeof body === 'string' && body ? body : 'Archivo procesado correctamente.';
          this.uploading = false;
          this.snack.open('Importación completada', 'OK', { duration: 2500 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.uploading = false;
        let msg = 'Error desconocido';
        if (err.error) {
          if (typeof err.error === 'string') {
            msg = err.error;
          } else if (typeof err.error === 'object') {
            msg = err.error.message || (err.error.error as string) || JSON.stringify(err.error);
          }
        } else if (err.message) {
          msg = err.message;
        }
        this.fail(`Error al subir el archivo: ${msg}`);
      }
    });
  }

  cancelarSeleccion() {
    if (this.uploading) return;
    this.selectedFile = null;
    this.serverMessage = '';
    this.errorMessage = '';
    this.uploadProgress = 0;
  }

  private fail(msg: string): false {
    this.errorMessage = msg;
    this.snack.open(msg, 'Cerrar', { duration: 3500, panelClass: ['snack-error'] });
    return false;
  }
}