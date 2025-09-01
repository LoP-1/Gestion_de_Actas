import { Routes } from '@angular/router';
import { InicioPeriodosComponent } from './components/inicio-periodos/inicio-periodos';
import { UsuariosPeriodoComponent } from './components/usuarios-periodo/usuarios-periodo';
import { DetalleCompletoComponent } from './components/detalle-completo/detalle-completo';

export const routes: Routes = [
  { path: '', component: InicioPeriodosComponent },
  { path: 'usuarios-periodo', component: UsuariosPeriodoComponent },
  { path: 'usuarios-periodo/:periodoPago', component: UsuariosPeriodoComponent },
  { path: 'detalles-completos/:id', component: DetalleCompletoComponent }
];