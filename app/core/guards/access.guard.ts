import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccessService } from '../services/access.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(
    private accessService: AccessService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const moduleName = route.data['module'];
    const action = route.data['action'];

    if (!moduleName || !action) {
      return new Observable<boolean>(observer => observer.next(false));
    }

    return this.accessService.hasPermission(moduleName, action).pipe(
      take(1),
      map(hasAccess => {
        if (!hasAccess) {
          const urlParts = state.url.split('/');
          const modulePath = urlParts[1];
          this.router.navigate([`/${modulePath}/access-denied`]);
          return false;
        }
        return true;
      })
    );
  }
} 