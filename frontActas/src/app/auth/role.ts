import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const allowedRoles = (route.data?.['roles'] as string[] | undefined)?.map(r => r.toUpperCase()) ?? [];
    const rol = (localStorage.getItem('rol') || '').toUpperCase();

    if (allowedRoles.length > 0 && !allowedRoles.includes(rol)) {
      // Redirige si no tiene el rol requerido
      return this.router.parseUrl('/inicio');
    }
    return true;
  }
}