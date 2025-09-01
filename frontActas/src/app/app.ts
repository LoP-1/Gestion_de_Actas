import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
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
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  ultimoBoletaId: number = 1;
  carritoBoletas: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const ultimo = localStorage.getItem('ultimoBoletaId');
    this.ultimoBoletaId = ultimo ? Number(ultimo) : 1;
    this.cargarCarrito();

    window.addEventListener('carritoActualizado', () => {
      this.cargarCarrito();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.cargarCarrito();
      const ultimo = localStorage.getItem('ultimoBoletaId');
      this.ultimoBoletaId = ultimo ? Number(ultimo) : 1;
    });
  }

  cargarCarrito() {
    this.carritoBoletas = JSON.parse(localStorage.getItem('carritoBoletas') || '[]');
  }

  removerBoleta(id: number) {
    this.carritoBoletas = this.carritoBoletas.filter(b => b.id !== id);
    localStorage.setItem('carritoBoletas', JSON.stringify(this.carritoBoletas));
    window.dispatchEvent(new Event('carritoActualizado'));
  }

}