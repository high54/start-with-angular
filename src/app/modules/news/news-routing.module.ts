import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromPages from './pages';


// routes
export const routes: Routes = [
  {
    path: '',
    component: fromPages.NewsComponent
  },
  {
    path: 'admin',
    component: fromPages.NewsAdminComponent
  },
  {
    path: ':articleId',
    component: fromPages.NewsItemComponent
  },
  {
    path: 'admin',
    component: fromPages.NewsAdminComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
