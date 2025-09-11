import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-detalle-simple',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, RouterModule, MatCardModule,
    MatButtonModule, MatTableModule, MatIconModule
  ],
  templateUrl: './detalle-simple.html',
  styleUrls: ['./detalle-simple.css']
})
// Muestra el detalle simple de una boleta en un diálogo
export class DetalleSimpleComponent {
  data: any = null;
  isLoading: boolean = true;

  ingresosDisplayedColumns = ['concepto', 'monto'];
  egresosDisplayedColumns = ['concepto', 'monto'];
  ingresos: Array<{ concepto: string, monto: number }> = [];
  egresos: Array<{ concepto: string, monto: number }> = [];
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private http: HttpClient,
    private dialogRef: MatDialogRef<DetalleSimpleComponent>,
    private router: Router
  ) {
    if (dialogData?.id) {
      localStorage.setItem('ultimoBoletaId', String(dialogData.id));
      this.loadData(dialogData.id);
    } else {
      this.isLoading = false;
    }
  }

  private loadData(id: number) {
    this.isLoading = true;
    this.http.get<any>(`${environment.apiUrl}/usuarios/${id}`)
      .subscribe(resp => {
        this.data = resp;
        this.isLoading = false;

        this.ingresos = [];
        if (resp && resp.ingresosJson) {
          try {
            const ingresosObj = typeof resp.ingresosJson === 'string' ? JSON.parse(resp.ingresosJson) : resp.ingresosJson;
            this.ingresos = Object.entries(ingresosObj)
              .filter(([_, monto]) => Number(monto) !== 0)
              .map(([concepto, monto]) => ({
                concepto: String(concepto),
                monto: Number(monto)
              }));
          } catch (e) {
            console.error("Error parsing ingresosJson", e);
          }
        }

        this.egresos = [];
        if (resp && resp.egresosJson) {
          try {
            const egresosObj = typeof resp.egresosJson === 'string' ? JSON.parse(resp.egresosJson) : resp.egresosJson;
            this.egresos = Object.entries(egresosObj)
              .filter(([_, monto]) => Number(monto) !== 0)
              .map(([concepto, monto]) => ({
                concepto: String(concepto),
                monto: Number(monto)
              }));
          } catch (e) {
            console.error("Error parsing egresosJson", e);
          }
        }

        this.totalIngresos = this.ingresos.reduce((acc, cur) => acc + cur.monto, 0);
        this.totalEgresos = this.egresos.reduce((acc, cur) => acc + cur.monto, 0);
      }, err => {
        this.isLoading = false;
        console.error('Error cargando detalle boleta:', err);
      });
  }

  agregarADetalles() {
    if (!this.data) return;

    const boleta = {
      id: this.data.id,
      nombre: `${this.data.nombres} ${this.data.apePaterno} ${this.data.apeMaterno}`,
      periodo: this.data.periodoPago,
      dni: this.data.nroDocumento
    };

    let carrito: any[] = JSON.parse(localStorage.getItem('carritoBoletas') || '[]');
    if (!carrito.find(item => item.id === boleta.id)) {
      carrito.push(boleta);
      localStorage.setItem('carritoBoletas', JSON.stringify(carrito));
      window.dispatchEvent(new Event('carritoActualizado'));
    }
  }

  cerrarDialogo() {
    this.dialogRef.close();
  }

  verDetalleCompleto() {
    this.agregarADetalles();
    this.cerrarDialogo();
    this.router.navigate(['/detalles-completos', this.dialogData.id]);
  }

  verDescuentos() {
    this.agregarADetalles();
    this.cerrarDialogo();
    this.router.navigate(['/descuentos', this.data?.nroDocumento]);
  }
}