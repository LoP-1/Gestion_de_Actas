import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Personal } from '../models/personal';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Ajusta si usas environments
  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(dni: string, contrasena: string): Observable<{ token: string; rol: string }> {
    return this.http.post<{ token: string; rol: string }>(`${this.api}/auth/login`, { dni, contrasena })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('rol', res.rol);
        })
      );
  }

  register(usuario: Personal): Observable<Personal> {
    // El backend devuelve el objeto Personal con id y contrasena hasheada
    return this.http.post<Personal>(`${this.api}/auth/register`, usuario);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }
}