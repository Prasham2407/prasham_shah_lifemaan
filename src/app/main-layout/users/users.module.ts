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
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoreModule } from '../../core/core.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AccessGuard } from '../../core/guards/access.guard';
import { AccessDeniedComponent } from 'src/app/core/components/access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [AccessGuard],
    data: { module: 'Users', action: 'Users.ListUsers' }
  },
  {
    path: 'new',
    component: UserEditComponent,
    canActivate: [AccessGuard],
    data: { module: 'Users', action: 'Users.CreateUsers' }
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: ':id',
    component: UserDetailComponent,
    canActivate: [AccessGuard],
    data: { module: 'Users', action: 'Users.GetUsers' }
  },
  {
    path: ':id/edit',
    component: UserEditComponent,
    canActivate: [AccessGuard],
    data: { module: 'Users', action: 'Users.UpdateUsers' }
  },
  
];

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserDetailComponent
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
    MatTooltipModule
  ]
})
export class UsersModule { } 