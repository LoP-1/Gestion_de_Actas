// Define la interfaz Personal
export interface Personal {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  rol: 'ADMIN' | 'USER' | string;
  contrasena: string;
}