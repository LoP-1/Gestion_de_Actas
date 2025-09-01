import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioPeriodo } from '../models/usuario-periodo';

@Injectable({ providedIn: 'root' })
export class UsuariosPeriodoService {
  private baseUrl = 'http://localhost:8080/periodo';

  constructor(private http: HttpClient) {}

  getUsuariosPeriodo(periodoPago: string): Observable<UsuarioPeriodo[]> {
    return this.http.get<UsuarioPeriodo[]>(`${this.baseUrl}/${periodoPago}`);
  }
}