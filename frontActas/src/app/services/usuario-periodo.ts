import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioPeriodo } from '../models/usuario-periodo';
import { environment } from '../../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class UsuariosPeriodoService {
  private baseUrl = `${environment.apiUrl}/periodo`;

  constructor(private http: HttpClient) {}

  getUsuariosPeriodo(periodoPago: string): Observable<UsuarioPeriodo[]> {
    return this.http.get<UsuarioPeriodo[]>(`${this.baseUrl}/${periodoPago}`);
  }
}