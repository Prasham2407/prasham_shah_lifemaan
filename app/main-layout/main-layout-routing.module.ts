import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { AccessGuard } from '../core/guards/access.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
        canActivate: [AccessGuard],
        data: { module: 'Reports', action: 'view' }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AccessGuard],
        data: { module: 'Users', action: 'view' }
      },
      {
        path: 'files',
        loadChildren: () => import('./files/files.module').then(m => m.FilesModule),
        canActivate: [AccessGuard],
        data: { module: 'Files', action: 'view' }
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        canActivate: [AccessGuard],
        data: { module: 'Projects', action: 'view' }
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AccessGuard],
        data: { module: 'Settings', action: 'view' }
      },
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { } 