import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PeriodoDTO {
  id: number;
  periodoPago: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeriodoDetallesService {
  private apiUrl = 'http://localhost:8080/usuarios/periodos';

  constructor(private http: HttpClient) {}

  listarPeriodosPorDni(dni: string): Observable<PeriodoDTO[]> {
    return this.http.get<PeriodoDTO[]>(`${this.apiUrl}/${dni}`);
  }
}