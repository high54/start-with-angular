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
        outlet: 'news-admin'
      },
      {
        path: 'manage-articles',
        component: fromComponents.NewsManageArticlesComponent,
        outlet: 'news-admin'
      },
      {
        path: 'moderate-comments',
        component: fromComponents.NewsModerateCommentsComponent,
        outlet: 'news-admin'
      },
      {
        path: 'article-form',
        component: fromComponents.NewsArticleFormComponent,
        outlet: 'news-admin'
      },
      {
        path: 'article-form/:articleId',
        component: fromComponents.NewsArticleFormComponent,
        outlet: 'news-admin'
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
