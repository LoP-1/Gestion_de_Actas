import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment'; // <- verifica ruta real

export type PeriodRow = {
  periodo_pago: string | number; // e.g. "202410" or 202410
  egresos_json: string | null;
};

@Injectable({ providedIn: 'root' })
export class DescuentosService {
  // Ajusta la ruta si tu backend expone otro path
  private apiUrl = `${environment.apiUrl}/descuentos`;

  constructor(private http: HttpClient) {}

  getPeriodosEgresosByDni(nroDocumento: string, year?: number): Observable<PeriodRow[]> {
    let params = new HttpParams().set('nro_documento', nroDocumento);
    if (year) params = params.set('year', String(year));
    return this.http.get<PeriodRow[]>(this.apiUrl, { params });
  }
}