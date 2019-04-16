import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Pages
import * as fromPages from './pages';
// Components
import * as fromComponents from './components';

// Guard from Auth
import { AuthGuard } from 'src/app/core/auth/guards';

// Resolvers
import * as fromResolvers from './resolvers';


// routes
export const routes: Routes = [
  {
    path: '',
    component: fromPages.NewsComponent,
    resolve: {
      articles: fromResolvers.ArticleListeResolver
    }
  },
  {
    path: 'admin',
    component: fromPages.NewsAdminComponent,
    canActivate: [AuthGuard],
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
        outlet: 'news-admin',
        resolve: {
          articles: fromResolvers.ArticleListeResolver
        }
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
        outlet: 'news-admin',
        resolve: {
          article: fromResolvers.ArticleResolver
        }
      }
    ]
  },
  {
    path: ':articleId',
    component: fromPages.NewsItemComponent,
    resolve: {
      article: fromResolvers.ArticleResolver
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
