import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ModuleGrant {
  moduleName: string;
  allowedActions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GrantService {
  private grantsCache: Map<string, ModuleGrant> = new Map();

  constructor() {
    // Initialize with the provided permissions
    const initialGrants: ModuleGrant[] = [
      {
        moduleName: 'Reports',
        allowedActions: ['Reports.ListReports', 'Reports.GetReports', 'Reports.CreateReport', 'Reports.DeleteReport']
      },
      {
        moduleName: 'Files',
        allowedActions: ['Reports.ListFiles','Files.GetFiles', 'Files.UploadFile', 'Files.DeleteFile']
      }
    ];

    initialGrants.forEach(grant => {
      this.grantsCache.set(grant.moduleName, grant);
    });
  }

  getGrants(moduleNames: string[]): Observable<ModuleGrant[]> {
    const grants = moduleNames
      .map(name => this.grantsCache.get(name))
      .filter((grant): grant is ModuleGrant => grant !== undefined);
    
    return of(grants);
  }

  hasGrant(moduleName: string, action: string): boolean {
    const grant = this.grantsCache.get(moduleName);
    return grant?.allowedActions.includes(action) ?? false;
  }

  clearCache() {
    this.grantsCache.clear();
  }
} 