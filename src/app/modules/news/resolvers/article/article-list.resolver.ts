import { Injectable } from '@angular/core';
import { Article } from '../../models/article.interface';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../../services';

@Injectable()
export class ArticleListeResolver implements Resolve<Article[]> {
    constructor(
        private articleService: ArticleService
    ) { }

    resolve(): Observable<Article[]> {
        return this.articleService.getArticles();
    }
}
