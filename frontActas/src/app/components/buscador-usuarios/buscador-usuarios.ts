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
import { BeneficiarioDetallesComponent } from '../../components/beneficiario-detalles/beneficiario-detalles';

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
  periodosComoBeneficiario: { [dni: string]: string[] | undefined } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  isMobile = false;

  private static readonly STORAGE_KEY = 'buscadorUsuariosFiltros';

  constructor(
    private usuarioService: UsuarioService,
    private periodoDetalles: PeriodoDetallesService,
    private dialog: MatDialog
  ) {
    this.dataSource.filterPredicate = (data: UsuarioUnico, filter: string) => {
      const filters = JSON.parse(filter);
      const matchDni = !filters.dni || (data.dni ?? '').toLowerCase().includes(filters.dni);
      const matchNombre = !filters.nombre || (data.nombres ?? '').toLowerCase().includes(filters.nombre);
      const matchApellido = !filters.apellido || (data.apellido ?? '').toLowerCase().includes(filters.apellido);
      return matchDni && matchNombre && matchApellido;
    };
  }

  ngOnInit(): void {
    this.checkScreenSize();
    // Leer filtros desde localStorage
    const saved = localStorage.getItem(BuscadorUsuariosComponent.STORAGE_KEY);
    if (saved) {
      try {
        const filtros = JSON.parse(saved);
        this.filtroDni = filtros.dni || '';
        this.filtroNombre = filtros.nombre || '';
        this.filtroApellido = filtros.apellido || '';
      } catch {}
    }
    this.usuarioService.listarUsuariosUnicos().subscribe(data => {
      this.dataSource.data = data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      this.aplicarFiltro(); // Aplica el filtro guardado
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
    // Guardar en localStorage
    localStorage.setItem(BuscadorUsuariosComponent.STORAGE_KEY, filterValue);
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
    this.expandedElement = null;
  }

  limpiarFiltros(): void {
    this.filtroDni = '';
    this.filtroNombre = '';
    this.filtroApellido = '';
    localStorage.removeItem(BuscadorUsuariosComponent.STORAGE_KEY);
    this.aplicarFiltro();
  }

  onRowExpand(usuario: UsuarioUnico) {
    if (this.expandedElement === usuario) {
      this.expandedElement = null;
      return;
    }
    this.expandedElement = usuario;

    // Periodos como titular
    if (this.periodosPorUsuario[usuario.dni] === undefined) {
      this.periodoDetalles.listarPeriodosPorDni(usuario.dni).subscribe(periodos => {
        this.periodosPorUsuario[usuario.dni] = periodos;
      });
    }

    // Periodos como beneficiario
    if (this.periodosComoBeneficiario[usuario.dni] === undefined) {
      this.periodoDetalles.listarPeriodosPorDniBeneficiario(usuario.dni).subscribe(periodos => {
        this.periodosComoBeneficiario[usuario.dni] = periodos;
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

  onPeriodoBeneficiarioClick(periodo: string, usuario: UsuarioUnico) {
    this.dialog.open(BeneficiarioDetallesComponent, {
      data: { periodo, dni: usuario.dni },
      panelClass: 'boleta-dialog-panel',
      width: '96vw',
      height: '92vh',
      maxWidth: '100vw',
    });
  }

  onPageChange() {
    this.expandedElement = null;
  }

  abrirDetalle(id: number | string) {
    this.dialog.open(DetalleSimpleComponent, {
      data: { id },
      width: '96vw',
      height: '92vh',
      maxWidth: '100vw',
    });
  }

  // Método para obtener datos paginados
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