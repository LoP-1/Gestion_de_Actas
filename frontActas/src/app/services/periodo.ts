import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Periodo } from '../models/periodo';
import { environment } from '../../enviroments/enviroment'; // ajusta si tu ruta real es environments/environment

@Injectable({ providedIn: 'root' })
export class PeriodoService {
  private apiUrl = `${environment.apiUrl}/periodo`;

  constructor(private http: HttpClient) {}

  getPeriodos(): Observable<Periodo[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(rows =>
        rows.map(r => ({
          periodoPago: r.PeriodoPago, // renombrar
          month: r.Month,
          year: r.Year,
        }) as Periodo)
      )
    );
  }
}