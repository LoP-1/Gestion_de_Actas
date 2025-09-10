// Define la interfaz UsuarioPeriodo
export interface UsuarioPeriodo {
  id: number;
  codigoModular: string;
  dni: string;
  apellidos: string;
  nombres: string;
  cargo: string;
  cargoOrig: string;
  codEstablecimiento: string;
  situacion: string;
  tPlanilla: string;
  region: string;
  vecesRepetido?: number;
}