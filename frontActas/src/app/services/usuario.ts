import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioUnico } from '../models/usuario-unico';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios/lista-unicos`;

  constructor(private http: HttpClient) {}

  listarUsuariosUnicos(): Observable<UsuarioUnico[]> {
    return this.http.get<UsuarioUnico[]>(this.apiUrl);
  }
}