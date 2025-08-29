import { Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados';
import { BoletasEmpleadoComponent } from './boletas-empleado/boletas-empleado';

export const routes: Routes = [
    { path: '', component: EmpleadosComponent },
    { path: 'boletas', component: BoletasEmpleadoComponent }
];