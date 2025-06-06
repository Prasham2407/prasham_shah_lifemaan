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

  getData(moduleName:string){
    switch(moduleName) {
      case 'reports':
        const storedReports = localStorage.getItem('reports');
        let tempReports;
          if (storedReports) {
            const reports = JSON.parse(storedReports);
            tempReports = reports.map((report: any) => ({
              ...report,
              createdAt: new Date(report.createdAt),
              updatedAt: new Date(report.updatedAt || report.createdAt)
            }));
          } else {
            // Initialize with mock data
            tempReports = [
              {
                id: 1,
                title: 'Q1 Financial Report',
                description: 'Financial analysis and performance metrics for Q1 2024',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-20')
              },
              {
                id: 2,
                title: 'Annual Performance Review',
                description: 'Comprehensive review of company performance in 2023',
                createdAt: new Date('2024-01-10'),
                updatedAt: new Date('2024-01-10')
              },
              {
                id: 3,
                title: 'Market Analysis',
                description: 'Detailed analysis of market trends and opportunities',
                createdAt: new Date('2024-01-05'),
                updatedAt: new Date('2024-01-18')
              }
            ];
            localStorage.setItem('reports', JSON.stringify(tempReports));
          }
          return tempReports;
      case 'files':
        const storedFiles = localStorage.getItem('files');
        if (storedFiles) {
          const files = JSON.parse(storedFiles);
          let tempFiles;
          tempFiles = files.map((file: any) => ({
            ...file,
            uploadedAt: new Date(file.uploadedAt)
          }));
          return tempFiles;
        }
        break;
      case 'users':
        const storedUsers = localStorage.getItem('users');
        let tempUserList;
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          tempUserList = users.map((user: any) => ({
            ...user,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt || user.createdAt)
          }));
        } else {
          // Initialize with mock data
          tempUserList = [
            {
              id: 1,
              username: 'john.doe',
              email: 'john.doe@example.com',
              role: 'Admin',
              status: 'Active',
              createdAt: new Date('2024-01-15'),
              updatedAt: new Date('2024-01-20')
            },
            {
              id: 2,
              username: 'jane.smith',
              email: 'jane.smith@example.com',
              role: 'User',
              status: 'Active',
              createdAt: new Date('2024-01-10'),
              updatedAt: new Date('2024-01-10')
            },
            {
              id: 3,
              username: 'bob.wilson',
              email: 'bob.wilson@example.com',
              role: 'User',
              status: 'Inactive',
              createdAt: new Date('2024-01-05'),
              updatedAt: new Date('2024-01-18')
            }
          ];
          localStorage.setItem('users', JSON.stringify(tempUserList));
        } 
        return tempUserList;
      case 'projects':
        const storedProjects = localStorage.getItem('projects');
        let tempProjects;
        if (storedProjects) {
          const projects = JSON.parse(storedProjects);
          tempProjects = projects.map((project: any) => ({
            ...project,
            createdAt: new Date(project.createdAt),
            updatedAt: new Date(project.updatedAt)
          }));
        } else {
          // Initialize with mock data
          tempProjects = [
            {
              id: 1,
              name: 'Website Redesign',
              description: 'Complete overhaul of the company website with modern design and improved user experience',
              status: 'In Progress',
              createdAt: new Date('2024-01-15'),
              updatedAt: new Date('2024-01-20')
            },
            {
              id: 2,
              name: 'Mobile App Development',
              description: 'Development of a new mobile application for iOS and Android platforms',
              status: 'Planning',
              createdAt: new Date('2024-01-10'),
              updatedAt: new Date('2024-01-10')
            },
            {
              id: 3,
              name: 'Database Migration',
              description: 'Migration of legacy database to new cloud-based solution',
              status: 'Completed',
              createdAt: new Date('2024-01-05'),
              updatedAt: new Date('2024-01-18')
            }
          ];
          localStorage.setItem('projects', JSON.stringify(tempProjects));
        } 
        return tempProjects;
    }
  }

} 