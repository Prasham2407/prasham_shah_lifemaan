import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface AccessModule {
  moduleName: string;
  allowedActions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AccessDataService {
  private readonly ACCESS_STORAGE_KEY = 'app_access_modules';
  private readonly API_URL = `${environment.apiUrl}/access-modules`;

  private readonly DEFAULT_MODULES: AccessModule[] = [
    {
      moduleName: 'Reports',
      allowedActions: [
        'Reports.ListReports',
        'Reports.GetReports',
        'Reports.CreateReports',
        'Reports.DeleteReports',
        'Reports.UpdateReports'
      ]
    },
    {
      moduleName: 'Files',
      allowedActions: [
        'Files.UpdateFiles',
        'Files.ListFiles',
        'Files.GetFiles',
        'Files.UploadFiles',
        'Files.DeleteFiles',
        'Files.DownloadFiles',
        'Files.ShareFiles'
      ]
    },
    {
      moduleName: 'Users',
      allowedActions: [
        'Users.ListUsers',
        'Users.GetUsers',
        'Users.CreateUsers',
        'Users.UpdateUsers',
        'Users.DeleteUsers',
        'Users.AssignRoles'
      ]
    },
    {
      moduleName: 'Projects',
      allowedActions: [
        'Projects.ListProjects',
        'Projects.GetProjects',
        'Projects.CreateProjects',
        'Projects.UpdateProjects',
        'Projects.DeleteProjects',
        'Projects.AssignTeam'
      ]
    },
    {
      moduleName: 'Settings',
      allowedActions: [
        'Settings.ListSettings',
        'Settings.UpdateSettings'
      ]
    }
  ];

  constructor(private http: HttpClient) {
    this.initializeDefaultModules();
  }

  private initializeDefaultModules(): void {
    const storedAccess = localStorage.getItem(this.ACCESS_STORAGE_KEY);
    if (!storedAccess) {
      this.saveAccessModules(this.DEFAULT_MODULES).subscribe();
    }
  }

  getAccessModules(): Observable<AccessModule[]> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.get<AccessModule[]>(this.API_URL).pipe(
    //   catchError(error => {
    //     console.error('Error fetching access modules:', error);
    //     return this.getLocalAccessModules();
    //   })
    // );
    return this.getLocalAccessModules();
  }

  private getLocalAccessModules(): Observable<AccessModule[]> {
    const storedAccess = localStorage.getItem(this.ACCESS_STORAGE_KEY);
    return of(storedAccess ? JSON.parse(storedAccess) : this.DEFAULT_MODULES);
  }

  saveAccessModules(modules: AccessModule[]): Observable<boolean> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.post<boolean>(this.API_URL, modules).pipe(
    //   catchError(error => {
    //     console.error('Error saving access modules:', error);
    //     return this.saveLocalAccessModules(modules);
    //   })
    // );
    return this.saveLocalAccessModules(modules);
  }

  private saveLocalAccessModules(modules: AccessModule[]): Observable<boolean> {
    try {
      localStorage.setItem(this.ACCESS_STORAGE_KEY, JSON.stringify(modules));
      return of(true);
    } catch (error) {
      console.error('Error saving access modules:', error);
      return of(false);
    }
  }

  clearAccessModules(): Observable<boolean> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.delete<boolean>(this.API_URL).pipe(
    //   catchError(error => {
    //     console.error('Error clearing access modules:', error);
    //     return this.clearLocalAccessModules();
    //   })
    // );
    return this.clearLocalAccessModules();
  }

  private clearLocalAccessModules(): Observable<boolean> {
    try {
      localStorage.removeItem(this.ACCESS_STORAGE_KEY);
      return of(true);
    } catch (error) {
      console.error('Error clearing access modules:', error);
      return of(false);
    }
  }

  getModulePermissions(moduleName: string): Observable<string[]> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.get<string[]>(`${this.API_URL}/${moduleName}/permissions`).pipe(
    //   catchError(error => {
    //     console.error('Error fetching module permissions:', error);
    //     return this.getLocalModulePermissions(moduleName);
    //   })
    // );
    return this.getLocalModulePermissions(moduleName);
  }

  private getLocalModulePermissions(moduleName: string): Observable<string[]> {
    return this.getAccessModules().pipe(
      map(modules => {
        const module = modules.find(m => m.moduleName === moduleName);
        return module ? module.allowedActions : [];
      })
    );
  }
} 