import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { InicioPeriodosComponent } from './components/inicio-periodos/inicio-periodos';
import { UsuariosPeriodoComponent } from './components/usuarios-periodo/usuarios-periodo';
import { DetalleCompletoComponent } from './components/detalle-completo/detalle-completo';
import { BuscadorUsuariosComponent } from './components/buscador-usuarios/buscador-usuarios';
import { ImportarCsvComponent } from './components/importar/importar';
import { Registrar } from './components/registrar/registrar';
import { AuthGuard } from './auth/auth';
import { RoleGuard } from './auth/role';
import { DescuentosComponent } from './components/descuentos/descuentos';

// Define las rutas de la aplicación
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard], // exige estar logueado
    children: [
      // Rutas hijas del dashboard
      { path: 'inicio', component: InicioPeriodosComponent },
      { path: 'periodos', component: InicioPeriodosComponent }, 
      { path: 'descuentos', component: DescuentosComponent },
      { path: 'descuentos/:dni', component: DescuentosComponent },
      { path: 'usuarios-periodo', component: UsuariosPeriodoComponent },
      { path: 'usuarios-periodo/:periodoPago', component: UsuariosPeriodoComponent },
      { path: 'detalles-completos/:id', component: DetalleCompletoComponent },
      { path: 'buscador-usuarios', component: BuscadorUsuariosComponent },
      {
        path: 'importar',
        component: ImportarCsvComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] } // solo ADMIN
      },
      {
        path: 'registrar',
        component: Registrar,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] } // solo ADMIN
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];