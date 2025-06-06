import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AccessGuard } from '../../core/guards/access.guard';
import { AccessDeniedComponent } from '../../core/components/access-denied/access-denied.component';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    canActivate: [AccessGuard],
    data: { module: 'Projects', action: 'Projects.ListProjects' }
  },
  {
    path: 'new',
    component: ProjectEditComponent,
    canActivate: [AccessGuard],
    data: { module: 'Projects', action: 'Projects.CreateProjects' }
  },
  {
    path: ':id',
    component: ProjectDetailComponent,
    canActivate: [AccessGuard],
    data: { module: 'Projects', action: 'Projects.GetProjects' }
  },
  {
    path: ':id/edit',
    component: ProjectEditComponent,
    canActivate: [AccessGuard],
    data: { module: 'Projects', action: 'Projects.UpdateProjects' }
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  }
];

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectEditComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class ProjectsModule { } 