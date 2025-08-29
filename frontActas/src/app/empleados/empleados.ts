import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DetalleEmpleado } from '../detalle-empleado/detalle-empleado';
import { EmpleadosService, EmpleadoResumen } from '../service/empleados';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css'
})
export class EmpleadosComponent implements OnInit {
  displayedColumns = [
    'modular', 'dni', 'apellidos', 'nombres', 'cargo', 'estable', 'situacion', 'planilla', 'region', 'vecesRepetido', 'acciones'
  ];

  dataSource: EmpleadoResumen[] = [];

  filter = {
    nombre: '',
    apellido: '',
    dni: '',
    modular: ''
  };

  get filteredData() {
    return this.dataSource.filter(emp =>
      (this.filter.nombre === '' || emp.nombres?.toLowerCase().includes(this.filter.nombre.toLowerCase())) &&
      (this.filter.apellido === '' || emp.apellidos?.toLowerCase().includes(this.filter.apellido.toLowerCase())) &&
      (this.filter.dni === '' || emp.dni?.includes(this.filter.dni)) &&
      (this.filter.modular === '' || emp.codigoModular?.includes(this.filter.modular))
    );
  }

  constructor(private dialog: MatDialog, private empleadosService: EmpleadosService) {}

  ngOnInit() {
  console.log('ngOnInit ejecutado');
  this.empleadosService.getEmpleados().subscribe({
    next: (data: EmpleadoResumen[]) => this.dataSource = data,
    error: (err: any) => { 
      console.error('Error cargando empleados', err);
      this.dataSource = [];
    }
  });
}

  abrirDetalle(empleado: EmpleadoResumen) {
  this.empleadosService.getDetalleEmpleado(empleado.dni).subscribe({
    next: (detalle) => {
      this.dialog.open(DetalleEmpleado, {
        data: detalle,
        width: '80vw',
        maxWidth: '95vw',
        height: '90vh',
        maxHeight: '90vh',
        panelClass: 'custom-modalbox'
      });
      
    },
    error: (err) => {
      console.error('Error obteniendo detalle', err);
    }
  });
}
}