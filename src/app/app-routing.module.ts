import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ModulesResolver } from './core/resolvers/modules.resolver';
import { ModulesResolver } from './core/resolvers/modules.resolver';
import { ModuleGuard } from './core/guards/module.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ModuleGuard],
    loadChildren: () => import('./main-layout/main-layout.module').then(m => m.MainLayoutModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
