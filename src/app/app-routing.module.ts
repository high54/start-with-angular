import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'news' },
  {
    path: 'news',
    loadChildren: './modules/news/news.module#NewsModule',
  },
  {
    path: 'authentication',
    loadChildren: './core/auth/auth.module#AuthModule'
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
