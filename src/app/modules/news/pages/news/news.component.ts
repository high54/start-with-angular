import { Component, OnInit } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Services
import { ArticleService } from '../../services';
// Models
import { Article } from '../../models/article.interface';

@Component({
    selector: 'app-news',
    styleUrls: ['news.component.scss'],
    templateUrl: 'news.component.html',
})
export class NewsComponent implements OnInit {

    articles$: Observable<Article[]>;

    constructor(
        private articleService: ArticleService
    ) { }

    ngOnInit() {
        this.articles$ = this.articleService.getArticles();
    }
}
