import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-beneficiario-detalles',
  standalone: true,
  templateUrl: './beneficiario-detalles.html',
  styleUrls: ['./beneficiario-detalles.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule
  ],
})
export class BeneficiarioDetallesComponent {
  beneficiarios: any[] = [];
  loading = true;
  error = '';
  seleccionado: any = null;

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { periodo: string, dni: string }
  ) {
    this.cargarBeneficiarios();
  }

  cargarBeneficiarios() {
    const url = `http://localhost:8000/api/beneficiarios?periodo_pago=${this.data.periodo}&dni_tit=${this.data.dni}`;
    this.http.get<any[]>(url).subscribe({
      next: (resp) => {
        this.beneficiarios = resp;
        this.loading = false;
        this.seleccionado = resp.length > 0 ? resp[0] : null; // Primera persona seleccionada por defecto
      },
      error: () => {
        this.error = 'No se pudo cargar la información';
        this.loading = false;
      }
    });
  }

  seleccionar(b: any) {
    this.seleccionado = b;
  }

  getNombreCompletoBen(b: any): string {
    return `${b.nom_ben ?? ''} ${b.pat_ben ?? ''} ${b.mat_ben ?? ''}`.trim();
  }
}