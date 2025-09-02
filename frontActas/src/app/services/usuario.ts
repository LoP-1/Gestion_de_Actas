import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioUnico } from '../models/usuario-unico';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios/lista-unicos';

  constructor(private http: HttpClient) {}

  listarUsuariosUnicos(): Observable<UsuarioUnico[]> {
    return this.http.get<UsuarioUnico[]>(this.apiUrl);
  }
}