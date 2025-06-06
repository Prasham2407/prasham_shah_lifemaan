import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleDataService {
  private readonly MODULES_STORAGE_KEY = 'app_modules';
  private readonly API_URL = `${environment.apiUrl}/modules`;

  private readonly DEFAULT_MODULES: string[] = [
    'Reports',
    'Files',
    'Users',
    'Projects',
    'Settings'
  ];

  constructor(private http: HttpClient) {
    this.initializeDefaultModules();
  }

  private initializeDefaultModules(): void {
    const storedModules = localStorage.getItem(this.MODULES_STORAGE_KEY);
    if (!storedModules) {
      this.saveModules(this.DEFAULT_MODULES).subscribe();
    }
  }

  getModules(): Observable<string[]> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.get<string[]>(this.API_URL).pipe(
    //   catchError(error => {
    //     console.error('Error fetching modules:', error);
    //     return this.getLocalModules();
    //   })
    // );
    return this.getLocalModules();
  }

  private getLocalModules(): Observable<string[]> {
    const storedModules = localStorage.getItem(this.MODULES_STORAGE_KEY);
    return of(storedModules ? JSON.parse(storedModules) : this.DEFAULT_MODULES);
  }

  saveModules(modules: string[]): Observable<boolean> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.post<boolean>(this.API_URL, modules).pipe(
    //   catchError(error => {
    //     console.error('Error saving modules:', error);
    //     return this.saveLocalModules(modules);
    //   })
    // );
    return this.saveLocalModules(modules);
  }

  private saveLocalModules(modules: string[]): Observable<boolean> {
    try {
      localStorage.setItem(this.MODULES_STORAGE_KEY, JSON.stringify(modules));
      return of(true);
    } catch (error) {
      console.error('Error saving modules:', error);
      return of(false);
    }
  }

  clearModules(): Observable<boolean> {
    // TODO: Replace with actual API call when backend is ready
    // return this.http.delete<boolean>(this.API_URL).pipe(
    //   catchError(error => {
    //     console.error('Error clearing modules:', error);
    //     return this.clearLocalModules();
    //   })
    // );
    return this.clearLocalModules();
  }

  private clearLocalModules(): Observable<boolean> {
    try {
      localStorage.removeItem(this.MODULES_STORAGE_KEY);
      return of(true);
    } catch (error) {
      console.error('Error clearing modules:', error);
      return of(false);
    }
  }
} 