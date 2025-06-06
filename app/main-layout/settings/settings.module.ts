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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AccessGuard } from '../../core/guards/access.guard';
import { AccessDeniedComponent } from '../../core/components/access-denied/access-denied.component';
import { SettingsComponent } from 'src/app/main-layout/settings/settings.component';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AccessGuard],
    data: { module: 'Settings', action: 'Settings.ListSettings' }
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  }
];

@NgModule({
  declarations: [
    SettingsComponent
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
    MatSelectModule,
    MatSlideToggleModule
  ]
})
export class SettingsModule { } 