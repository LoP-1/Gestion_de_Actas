import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  // Referencias a los sidebars para controlarlos programáticamente
  @ViewChild('menuSidenav') menuSidenav!: MatSidenav;
  @ViewChild('carritoSidenav') carritoSidenav!: MatSidenav;

  // Propiedades existentes
  ultimoBoletaId: number = 1;
  carritoBoletas: any[] = [];
  periodoMenuOpen = true;
  currentUrl: string = '';

  // Nueva propiedad para el modo responsivo
  isDesktop = true;

  constructor(private router: Router) {}

  ngOnInit() {
    const ultimo = localStorage.getItem('ultimoBoletaId');
    this.ultimoBoletaId = ultimo ? Number(ultimo) : 1;
    this.cargarCarrito();

    // Verificar tamaño inicial de pantalla
    this.checkScreenSize();

    window.addEventListener('carritoActualizado', () => {
      this.cargarCarrito();
    });

    this.periodoMenuOpen = this.isSeleccionarPeriodoActive();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.cargarCarrito();
        const ult = localStorage.getItem('ultimoBoletaId');
        this.ultimoBoletaId = ult ? Number(ult) : 1;
        this.periodoMenuOpen = this.isSeleccionarPeriodoActive();
        this.currentUrl = event?.url || this.router.url;
      });

    // Inicializa currentUrl al cargar
    this.currentUrl = this.router.url;
  }

  // Detectar cambios en el tamaño de la ventana - CORREGIDO
  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) { // Cambio: UIEvent en lugar de any
    this.checkScreenSize();
  }

  /**
   * Verifica el tamaño de pantalla y ajusta el comportamiento de los sidebars
   */
  checkScreenSize() {
    this.isDesktop = window.innerWidth > 768;
    
    // Esperar a que los ViewChild estén disponibles
    setTimeout(() => {
      if (!this.isDesktop) {
        // En móvil, cerrar ambos sidebars por defecto
        if (this.menuSidenav && this.menuSidenav.opened) {
          this.menuSidenav.close();
        }
        if (this.carritoSidenav && this.carritoSidenav.opened) {
          this.carritoSidenav.close();
        }
      } else {
        // En desktop, abrir ambos sidebars
        if (this.menuSidenav && !this.menuSidenav.opened) {
          this.menuSidenav.open();
        }
        if (this.carritoSidenav && !this.carritoSidenav.opened) {
          this.carritoSidenav.open();
        }
      }
    }, 0);
  }

  /**
   * Alterna la visibilidad del sidebar del menú (solo en móvil)
   */
  toggleSidebar() {
    if (!this.isDesktop && this.menuSidenav) {
      // Si el carrito está abierto, cerrarlo primero
      if (this.carritoSidenav && this.carritoSidenav.opened) {
        this.carritoSidenav.close();
      }
      this.menuSidenav.toggle();
    }
  }

  /**
   * Alterna la visibilidad del sidebar del carrito (solo en móvil)
   */
  toggleCarrito() {
    if (!this.isDesktop && this.carritoSidenav) {
      // Si el menú está abierto, cerrarlo primero
      if (this.menuSidenav && this.menuSidenav.opened) {
        this.menuSidenav.close();
      }
      this.carritoSidenav.toggle();
    }
  }

  /**
   * Cierra el sidebar del menú automáticamente al navegar en móvil
   */
  closeSidebarOnMobile() {
    if (!this.isDesktop && this.menuSidenav && this.menuSidenav.opened) {
      this.menuSidenav.close();
    }
  }

  /**
   * Cierra el sidebar del carrito automáticamente al navegar en móvil
   */
  closeCarritoOnMobile() {
    if (!this.isDesktop && this.carritoSidenav && this.carritoSidenav.opened) {
      this.carritoSidenav.close();
    }
  }

  // Propiedades existentes
  get isAdmin(): boolean {
    return (localStorage.getItem('rol') || '').toUpperCase() === 'ADMIN';
  }

  get panelTitle(): string {
    return this.isAdmin ? 'Panel de Administrador' : 'Panel de Usuario';
  }

  /**
   * Getter para mostrar el título más corto en móviles
   */
  get mobilePanelTitle(): string {
    return this.isAdmin ? 'Admin' : 'Usuario';
  }

  cargarCarrito() {
    this.carritoBoletas = JSON.parse(localStorage.getItem('carritoBoletas') || '[]');
  }

  removerBoleta(id: number) {
    this.carritoBoletas = this.carritoBoletas.filter(b => b.id !== id);
    localStorage.setItem('carritoBoletas', JSON.stringify(this.carritoBoletas));
    window.dispatchEvent(new Event('carritoActualizado'));
  }

  isSeleccionarPeriodoActive(): boolean {
    const url = this.router.url || '';
    return url === '/periodos' || url.startsWith('/usuarios-periodo');
  }

  togglePeriodoMenu() {
    this.periodoMenuOpen = !this.periodoMenuOpen;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('carritoBoletas'); // Limpiar también el carrito
    this.router.navigate(['/login']);
  }

  /**
   * Método para manejar el clic en el backdrop (fondo oscuro) en móvil
   */
  onBackdropClick() {
    if (!this.isDesktop) {
      if (this.menuSidenav && this.menuSidenav.opened) {
        this.menuSidenav.close();
      }
      if (this.carritoSidenav && this.carritoSidenav.opened) {
        this.carritoSidenav.close();
      }
    }
  }

  /**
   * Método para detectar si hay algún sidebar abierto en móvil
   */
  get isSidebarOpenOnMobile(): boolean {
    if (this.isDesktop) return false;
    return (this.menuSidenav && this.menuSidenav.opened) || 
           (this.carritoSidenav && this.carritoSidenav.opened);
  }

  /**
   * Método para manejar teclas (ESC para cerrar sidebars en móvil) - CORREGIDO
   */
  @HostListener('document:keydown.escape', [])
  onEscapeKey() {
    if (!this.isDesktop) {
      if (this.menuSidenav && this.menuSidenav.opened) {
        this.menuSidenav.close();
      }
      if (this.carritoSidenav && this.carritoSidenav.opened) {
        this.carritoSidenav.close();
      }
    }
  }
}