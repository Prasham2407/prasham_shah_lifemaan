import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoreModule } from '../../core/core.module';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportEditComponent } from './report-edit/report-edit.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { AccessGuard } from '../../core/guards/access.guard';
import { AccessDeniedComponent } from '../../core/components/access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    component: ReportListComponent,
    canActivate: [AccessGuard],
    data: { module: 'Reports', action: 'Reports.ListReports' }
  },
  {
    path: 'new',
    component: ReportEditComponent,
    canActivate: [AccessGuard],
    data: { module: 'Reports', action: 'Reports.CreateReports' }
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: ':id',
    component: ReportDetailComponent,
    canActivate: [AccessGuard],
    data: { module: 'Reports', action: 'Reports.GetReports' }
  },
  {
    path: ':id/edit',
    component: ReportEditComponent,
    canActivate: [AccessGuard],
    data: { module: 'Reports', action: 'Reports.UpdateReports' }
  },
];

@NgModule({
  declarations: [
    ReportListComponent,
    ReportEditComponent,
    ReportDetailComponent
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
    MatTooltipModule
  ]
})
export class ReportsModule { } 