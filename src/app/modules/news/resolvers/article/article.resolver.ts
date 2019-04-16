import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.interface';
import { ArticleService } from '../../services';

@Injectable()
export class ArticleResolver implements Resolve<Article> {
    constructor(
        private articleService: ArticleService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Article> {
        const articleId = parseInt(route.paramMap.get('articleId'), 10);
        return this.articleService.getArticle(articleId);
    }
}
