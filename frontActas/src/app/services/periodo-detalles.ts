import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

export interface PeriodoDTO {
  id: number;
  periodoPago: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeriodoDetallesService {
  private apiUrl = `${environment.apiUrl}/usuarios/periodos`;

  constructor(private http: HttpClient) {}

  listarPeriodosPorDni(dni: string): Observable<PeriodoDTO[]> {
    return this.http.get<PeriodoDTO[]>(`${this.apiUrl}/${dni}`);
  }

  listarPeriodosPorDniBeneficiario(dni: string): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/beneficiarios/periodos/dni/${dni}`);
  }
}