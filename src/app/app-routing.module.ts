import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromAuthPages from './core/auth/pages';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'news' },
  {
    path: 'news',
    loadChildren: './modules/news/news.module#NewsModule',
  },
  {
    path: 'authentication',
    component: fromAuthPages.AppLoginComponent
  },
  {
    path: '**',
    loadChildren: './core/not-found/not-found.module#NotFoundModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
