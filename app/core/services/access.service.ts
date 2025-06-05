import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessDataService, AccessModule } from './data/access.data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  constructor(private accessDataService: AccessDataService) {}

  getAccessModules(): Observable<string[]> {
    return this.accessDataService.getAccessModules().pipe(
      map(modules => modules.map(module => module.moduleName))
    );
  }

  getModulePermissions(moduleName: string): Observable<string[]> {
    return this.accessDataService.getModulePermissions(moduleName);
  }

  hasPermission(moduleName: string, permission: string): Observable<boolean> {
    return this.getModulePermissions(moduleName).pipe(
      map(permissions => permissions.includes(permission))
    );
  }

  clearAccessCache(): void {
    this.accessDataService.clearAccessModules().subscribe();
  }
} 