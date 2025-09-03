import { Routes } from '@angular/router';
import { InicioPeriodosComponent } from './components/inicio-periodos/inicio-periodos';
import { UsuariosPeriodoComponent } from './components/usuarios-periodo/usuarios-periodo';
import { DetalleCompletoComponent } from './components/detalle-completo/detalle-completo';
import { BuscadorUsuariosComponent } from './components/buscador-usuarios/buscador-usuarios';
import { ImportarCsvComponent } from './components/importar/importar';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'periodos', component: InicioPeriodosComponent },
  { path: 'inicio', component: InicioPeriodosComponent },
  { path: 'usuarios-periodo', component: UsuariosPeriodoComponent },
  { path: 'usuarios-periodo/:periodoPago', component: UsuariosPeriodoComponent },
  { path: 'detalles-completos/:id', component: DetalleCompletoComponent },
  { path: 'buscador-usuarios', component: BuscadorUsuariosComponent },
  { path: 'importar', component: ImportarCsvComponent },
  // { path: '**', redirectTo: 'login' }, // Opcional: rutas no encontradas
];