import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AccessService } from '../services/access.service';

export interface MainLayoutData {
  modules: string[];
  moduleActions: { [key: string]: string[] };
}

@Injectable({
  providedIn: 'root'
})
export class MainLayoutResolver implements Resolve<MainLayoutData> {
  constructor(private accessService: AccessService) {}

  resolve(): Observable<MainLayoutData> {
    console.log('Resolver: Starting to fetch modules and actions');
    return this.accessService.getAccessModules().pipe(
      tap(modules => console.log('Resolver: Fetched modules:', modules)),
      switchMap(modules => {
        // Create an array of observables to fetch actions for each module
        const actionObservables = modules.map(moduleName => 
          this.accessService.getModulePermissions(moduleName).pipe(
            tap(actions => console.log(`Resolver: Fetched actions for ${moduleName}:`, actions)),
            map(actions => ({ moduleName, actions }))
          )
        );

        // Combine all observables and transform the result
        return forkJoin(actionObservables).pipe(
          tap(results => console.log('Resolver: Combined results:', results)),
          map(results => {
            const moduleActions = results.reduce((acc, { moduleName, actions }) => {
              acc[moduleName] = actions;
              return acc;
            }, {} as { [key: string]: string[] });

            const finalData = {
              modules,
              moduleActions
            };
            console.log('Resolver: Final data:', finalData);
            return finalData;
          })
        );
      })
    );
  }
}

// Export the resolver as a module
export default MainLayoutResolver; 