import { Injectable, Inject } from '@angular/core';
import { ModuleService } from './module.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleLoaderService {
  constructor(@Inject(ModuleService) private moduleService: ModuleService) {}

  loadModules(): Observable<any[]> {
    return this.moduleService.getAvailableModules().pipe(
      switchMap(modules => {
        const moduleLoaders = modules.map(moduleName => {
          const modulePath = moduleName.toLowerCase();
          return import(`../main-layout/${modulePath}/${modulePath}.module`)
            .then(m => m[`${moduleName}Module`]);
        });
        return Promise.all(moduleLoaders);
      })
    );
  }
} 