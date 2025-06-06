import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { GrantService } from './grant.service';
import { AccessService } from 'src/app/core/services/access.service';
import { ModuleDataService } from './data/module.data.service';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
    private modulesCache: string[] | null = null;
  private availableModules = new BehaviorSubject<string[]>([]);

  // Available modules based on the provided permissions
  private mockModules: string[] = [];

  constructor(
    private grantService: GrantService,
    private accessService: AccessService,
    private moduleDataService: ModuleDataService
    ) {
    this.initializeModules();
  }

  private initializeModules() {
    this.moduleDataService.getModules().subscribe(modules => {
      this.mockModules = modules;
      this.availableModules.next(this.mockModules);
      this.modulesCache = this.mockModules;
      this.fetchGrants(this.mockModules);
    });
  }

  getAvailableModules(): Observable<string[]> {
    if (this.modulesCache) {
      return of(this.modulesCache);
    }

    return this.moduleDataService.getModules().pipe(
      tap((modules) => {
        this.modulesCache = modules;
        this.availableModules.next(modules);
        this.fetchGrants(modules);
      })
    );
  }

  private fetchGrants(modules: string[]) {
    this.grantService.getGrants(modules).subscribe();
  }

  getFirstAvailableModule(): string {
    return this.modulesCache?.[0] || this.mockModules[0];
  }

  hasAccess(moduleName: string): boolean {
    return this.modulesCache?.includes(moduleName) ?? false;
  }

  clearCache() {
    this.modulesCache = null;
    this.availableModules.next([]);
    this.grantService.clearCache();
    this.moduleDataService.clearModules().subscribe();
  }
}
