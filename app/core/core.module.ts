import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { GrantDirective } from 'src/app/core/directives/grant.directive';
import MainLayoutResolver from './resolvers/main-layout.resolver';
// import { GrantDirective } from './directives/grant.directive';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    GrantDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    AccessDeniedComponent,
    GrantDirective
  ],
  providers: [
    MainLayoutResolver
  ]
})
export class CoreModule { } 