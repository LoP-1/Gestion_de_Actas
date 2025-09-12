import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario';
import { PeriodoDetallesService, PeriodoDTO } from '../../services/periodo-detalles';
import { UsuarioUnico } from '../../models/usuario-unico';
import { DetalleSimpleComponent } from '../detalle-simple/detalle-simple';

@Component({
  selector: 'app-buscador-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule
  ],
  templateUrl: './buscador-usuarios.html',
  styleUrls: ['./buscador-usuarios.css']
})
export class BuscadorUsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'dni', 'nombres', 'apellido', 'codigoModular'];
  dataSource = new MatTableDataSource<UsuarioUnico>();

  filtroDni = '';
  filtroNombre = '';
  filtroApellido = '';

  expandedElement: UsuarioUnico | null = null;
  periodosPorUsuario: { [dni: string]: PeriodoDTO[] | undefined } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  isMobile = false;

  constructor(
    private usuarioService: UsuarioService,
    private periodoDetalles: PeriodoDetallesService,
    private dialog: MatDialog
  ) {
    this.dataSource.filterPredicate = (data: UsuarioUnico, filter: string) => {
      const filters = JSON.parse(filter);
      const matchDni = !filters.dni || data.dni?.toLowerCase().includes(filters.dni);
      const matchNombre = !filters.nombre || data.nombres?.toLowerCase().includes(filters.nombre);
      const matchApellido = !filters.apellido || data.apellido?.toLowerCase().includes(filters.apellido);
      return matchDni && matchNombre && matchApellido;
    };
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.usuarioService.listarUsuariosUnicos().subscribe(data => {
      this.dataSource.data = data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  aplicarFiltro(): void {
    const filterValue = JSON.stringify({
      dni: this.filtroDni.trim().toLowerCase(),
      nombre: this.filtroNombre.trim().toLowerCase(),
      apellido: this.filtroApellido.trim().toLowerCase()
    });
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
    this.expandedElement = null;
  }

  onRowExpand(usuario: UsuarioUnico) {
    if (this.expandedElement === usuario) {
      this.expandedElement = null;
      return;
    }
    this.expandedElement = usuario;

    if (this.periodosPorUsuario[usuario.dni] === undefined) {
      this.periodoDetalles.listarPeriodosPorDni(usuario.dni).subscribe(periodos => {
        this.periodosPorUsuario[usuario.dni] = periodos;
      });
    }
  }

  private getPeriodoId(periodo: PeriodoDTO): number | string {
    return (periodo as any).id ?? (periodo as any).periodoId ?? (periodo as any).idPeriodo;
  }

  onPeriodoClick(periodo: PeriodoDTO, usuario: UsuarioUnico) {
    const id = this.getPeriodoId(periodo);
    if (id === undefined || id === null) {
      console.warn('No se encontró un id en el PeriodoDTO. Revisa la propiedad del id.');
      return;
    }
    this.abrirDetalle(id);
  }

  onPageChange() {
    this.expandedElement = null;
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

  // ✅ Método para obtener datos paginados (CORREGIDO)
  getPaginatedData(): UsuarioUnico[] {
    if (!this.paginator) {
      return this.dataSource.filteredData;
    }
    
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    return this.dataSource.filteredData.slice(startIndex, endIndex);
  }

  isExpandedRow = (_index: number, row: UsuarioUnico) => this.expandedElement === row;
}