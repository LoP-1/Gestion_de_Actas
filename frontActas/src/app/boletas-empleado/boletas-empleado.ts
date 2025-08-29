import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BoletaDetalleComponent } from '../detalle-boleta/detalle-boleta';

@Component({
  selector: 'app-boletas-empleado',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './boletas-empleado.html',
  styleUrl: './boletas-empleado.css'
})
export class BoletasEmpleadoComponent implements OnInit {
  displayedColumns = [
    'periodoPago',
    'codigoModular',
    'totalRemuneracion',
    'acciones'
  ];
  boletas: any[] = [];
  dni: string = '';

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Lee el parámetro 'dni' de la URL
    this.route.queryParams.subscribe(params => {
      this.dni = params['dni'] || '';
      console.log('DNI recibido:', this.dni); // LOG para depurar
      if (this.dni) {
        this.http.get<any[]>(`http://localhost:8080/usuarios/detalles?nroDocumento=${this.dni}`)
          .subscribe(data => {
            this.boletas = data;
            console.log('Boletas cargadas:', this.boletas); // LOG!
          });
      }
    });
  }

  verDetalle(id: number) {
    this.dialog.open(BoletaDetalleComponent, {
      data: { id },
      width: '70vw',
      maxWidth: '95vw',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'custom-modalbox'
    });
  }
}