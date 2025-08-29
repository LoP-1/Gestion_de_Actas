import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-empleado',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './detalle-empleado.html',
  styleUrl: './detalle-empleado.css'
})
export class DetalleEmpleado {
  constructor(
    public dialogRef: MatDialogRef<DetalleEmpleado>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    // Depuración: muestra el objeto recibido en la consola
    console.log('Datos recibidos en el modal:', this.data);
  }

  cerrar() {
    this.dialogRef.close();
  }

  verBoletas() {
    window.open(`/boletas?dni=${this.data.nroDocumento}`, '_blank');
  }
}