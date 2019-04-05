import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromPages from './pages';
import * as fromComponents from './components';


// routes
export const routes: Routes = [
  {
    path: '',
    component: fromPages.NewsComponent
  },
  {
    path: 'admin',
    component: fromPages.NewsAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'manage-articles',
        pathMatch: 'full',
        outlet: 'newsAdmin'
      },
      {
        path: 'manage-articles',
        component: fromComponents.NewsManageArticlesComponent,
        outlet: 'newsAdmin'
      },
      {
        path: 'moderate-comments',
        component: fromComponents.NewsModerateCommentsComponent,
        outlet: 'newsAdmin'
      }
    ]
  },
  {
    path: ':articleId',
    component: fromPages.NewsItemComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
