import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.articles$ = this.route.data.pipe(map((data: { articles: Article[] }) => data.articles));
    }
}
