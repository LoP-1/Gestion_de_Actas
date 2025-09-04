import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

// Este es el tipo para el resumen (ya lo tienes)
export interface EmpleadoResumen {
  codigoModular: string;
  dni: string;
  apellidos: string;
  nombres: string;
  cargo: string;
  codEstablecimiento: string;
  situacion: string;
  tPlanilla: string;
  region: string;
  vecesRepetido: number;
}

// Este es el tipo para el detalle (igual al JSON que te da el backend)
export interface EmpleadoDetalle {
  codigoModular: string;
  cargo: string;
  apePaterno: string;
  apeMaterno: string;
  nombres: string;
  tPlanilla: string;
  situacion: string;
  fechaNacimiento: string;
  sexo: string;
  ugel: string;
  codEstablecimiento: string;
  establecimiento: string;
  codModIE: string;
  tipoDocumento: string;
  nroDocumento: string;
  fechaIngreso: string;
  fechaTermino: string | null;
  docReferencia: string;
  cargoOrig: string;
  ipss: string;
  regPensionario: string;
  cadPresupuestal: string;
  afp: string;
  cuspp: string;
  fechaAfiliacion: string | null;
  fechaDevengue: string | null;
  regLaboral: string;
  nivel: string;
  nivelMagisterial: string;
  modoPago: string;
  leyendaPermanente: string;
  ctaCte: string;
}

@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private apiUrl = `${environment.apiUrl}/usuarios/por-dni-unicos`;
  private detalleUrl = `${environment.apiUrl}/usuarios/detalle`;

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<EmpleadoResumen[]> {
    return this.http.get<EmpleadoResumen[]>(this.apiUrl);
  }

  // NUEVO: método para obtener el detalle
  getDetalleEmpleado(dni: string): Observable<EmpleadoDetalle> {
    return this.http.get<EmpleadoDetalle>(`${this.detalleUrl}/${dni}`);
  }
}