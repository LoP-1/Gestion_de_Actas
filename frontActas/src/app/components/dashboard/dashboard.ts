import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
    MatButtonModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  ultimoBoletaId: number = 1;
  carritoBoletas: any[] = [];
  periodoMenuOpen = true;
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const ultimo = localStorage.getItem('ultimoBoletaId');
    this.ultimoBoletaId = ultimo ? Number(ultimo) : 1;
    this.cargarCarrito();

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

  get isAdmin(): boolean {
    return (localStorage.getItem('rol') || '').toUpperCase() === 'ADMIN';
  }

  get panelTitle(): string {
    return this.isAdmin ? 'Panel de Administrador' : 'Panel de Usuario';
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
    this.router.navigate(['/login']);
  }
}