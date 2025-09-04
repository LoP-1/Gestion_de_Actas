import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetalleSimpleComponent } from '../detalle-simple/detalle-simple';

import { UsuariosPeriodoService } from '../../services/usuario-periodo';
import { UsuarioPeriodo } from '../../models/usuario-periodo';

@Component({
  selector: 'app-usuarios-periodo',
  standalone: true,
  templateUrl: './usuarios-periodo.html',
  styleUrls: ['./usuarios-periodo.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule, 
    FormsModule
  ]
})
export class UsuariosPeriodoComponent implements OnInit, AfterViewInit {
  periodoPago: string = '';
  displayedColumns: string[] = [
    'id', 'codigoModular', 'dni', 'apellidos', 'nombres', 'cargo',
    'cargoOrig', 'codEstablecimiento', 'situacion', 'tPlanilla', 'region', 'acciones'
  ];
  dataSource = new MatTableDataSource<UsuarioPeriodo>([]);
  filter = { nombre: '', apellido: '', dni: '', modular: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariosPeriodoService: UsuariosPeriodoService,
    private dialog: MatDialog // <-- ¡Inyecta MatDialog!
  ) {}

  ngOnInit(): void {
    this.periodoPago = this.route.snapshot.paramMap.get('periodoPago') || '';
    if (!this.periodoPago) {
      const ultimo = localStorage.getItem('ultimoPeriodo');
      if (ultimo) {
        this.router.navigate(['/usuarios-periodo', ultimo]);
      } else {
        this.router.navigate(['/usuarios-periodo']);
      }
      return;
    }
    localStorage.setItem('ultimoPeriodo', this.periodoPago);
    this.usuariosPeriodoService.getUsuariosPeriodo(this.periodoPago).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filtrar() {
    this.dataSource.filterPredicate = (emp: UsuarioPeriodo, filter: string) => {
      const f = JSON.parse(filter);
      return (!f.nombre || emp.nombres.toLowerCase().includes(f.nombre.toLowerCase())) &&
             (!f.apellido || emp.apellidos.toLowerCase().includes(f.apellido.toLowerCase())) &&
             (!f.dni || emp.dni.includes(f.dni)) &&
             (!f.modular || emp.codigoModular.includes(f.modular));
    };
    this.dataSource.filter = JSON.stringify(this.filter);
  }

  limpiarFiltros() {
    this.filter = { nombre: '', apellido: '', dni: '', modular: '' };
    this.filtrar();
  }

  abrirDetalle(id: number | string) {
  this.dialog.open(DetalleSimpleComponent, {
    data: { id },
    panelClass: 'boleta-dialog-panel',
    // Ocupa casi toda la ventana
    width: '96vw',
    height: '92vh',
    maxWidth: '100vw',
    // Opcional: si quieres que no se cierre clickeando afuera
    // disableClose: true
  });
}
}