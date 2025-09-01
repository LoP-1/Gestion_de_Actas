import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodo } from '../models/periodo';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  private apiUrl = 'http://localhost:8080/periodo';

  constructor(private http: HttpClient) {}

  getPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(this.apiUrl);
  }
}