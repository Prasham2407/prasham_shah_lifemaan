import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ModuleService } from '../services/module.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate {
  constructor(
    private moduleService: ModuleService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // If we're at the root path, redirect to first available module
    if (state.url === '/') {
      const firstModule = this.moduleService.getFirstAvailableModule();
      if (firstModule) {
        this.router.navigate([firstModule.toLowerCase()]);
        return of(false);
      }
    }

    // For other routes, check if the module is available
    const moduleName = state.url.split('/')[1];
    if (moduleName) {
      return this.moduleService.getAvailableModules().pipe(
        map(modules => {
          const hasAccess = modules.some(m => m.toLowerCase() === moduleName);
          if (!hasAccess) {
            // If module not available, redirect to first available module
            const firstModule = this.moduleService.getFirstAvailableModule();
            if (firstModule) {
              this.router.navigate([firstModule.toLowerCase()]);
            }
            return false;
          }
          return true;
        }),
        catchError(() => {
          // On error, redirect to first available module
          const firstModule = this.moduleService.getFirstAvailableModule();
          if (firstModule) {
            this.router.navigate([firstModule.toLowerCase()]);
          }
          return of(false);
        })
      );
    }

    return of(true);
  }
} 