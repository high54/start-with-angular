import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
// Rxjs
import { Observable } from 'rxjs';
// Services
import { ArticleService } from '../../services';
// Models
import { Article } from '../../models/article.interface';
@Injectable()
export class ArticleListResolver implements Resolve<Article[]> {
    constructor(
        private articleService: ArticleService
    ) { }

    resolve(): Observable<Article[]> {
        return this.articleService.getArticles();
    }
}
