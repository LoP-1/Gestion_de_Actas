import { Component, OnInit, ViewChild, AfterViewInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';

import { UsuariosPeriodoService } from '../../services/usuario-periodo';
import { UsuarioPeriodo } from '../../models/usuario-periodo';
import { DetalleSimpleComponent } from '../detalle-simple/detalle-simple';

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
    FormsModule,
    MatIconModule,
    LayoutModule
  ]
})
export class UsuariosPeriodoComponent implements OnInit, AfterViewInit {

  periodoPago = '';

  displayedColumnsDesktop: string[] = [
    'id','codigoModular','dni','apellidos','nombres','cargo',
    'cargoOrig','codEstablecimiento','situacion','tPlanilla','region','acciones'
  ];
  displayedColumnsMobile: string[] = ['dni','apellidos','nombres','acciones'];
  displayedColumns: string[] = this.displayedColumnsDesktop;

  dataSource = new MatTableDataSource<UsuarioPeriodo>([]);
  filter = { nombre: '', apellido: '', dni: '', modular: '' };

  isMobile = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private breakpointObserver = inject(BreakpointObserver);

  private expandedStates = new Map<number | string, boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariosPeriodoService: UsuariosPeriodoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setupResponsive();
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
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      data.forEach(emp => this.expandedStates.set(emp.id, false));
    });

    // Configuramos predicate una sola vez
    this.dataSource.filterPredicate = (emp: UsuarioPeriodo, filter: string) => {
      const f = JSON.parse(filter);
      return (!f.nombre || emp.nombres.toLowerCase().includes(f.nombre.toLowerCase())) &&
             (!f.apellido || emp.apellidos.toLowerCase().includes(f.apellido.toLowerCase())) &&
             (!f.dni || emp.dni.includes(f.dni)) &&
             (!f.modular || emp.codigoModular.includes(f.modular));
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private setupResponsive() {
    this.breakpointObserver.observe(['(max-width: 850px)']).subscribe(result => {
      this.isMobile = result.matches;
      this.displayedColumns = result.matches
        ? this.displayedColumnsMobile
        : this.displayedColumnsDesktop;
    });
  }

  filtrar() {
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
      width: '96vw',
      height: '92vh',
      maxWidth: '100vw',
    });
  }

  toggleExtendedInfo(emp: UsuarioPeriodo) {
    const currentState = this.expandedStates.get(emp.id) || false;
    this.expandedStates.set(emp.id, !currentState);
  }

  isExtended(emp: UsuarioPeriodo): boolean {
    return this.expandedStates.get(emp.id) || false;
  }
}