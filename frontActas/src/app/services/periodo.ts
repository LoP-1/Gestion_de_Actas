import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodo } from '../models/periodo';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  private apiUrl = `${environment.apiUrl}/periodo`;

  constructor(private http: HttpClient) {}

  getPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(this.apiUrl);
  }
}