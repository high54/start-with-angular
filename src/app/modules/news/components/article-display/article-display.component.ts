import { Component, Input } from '@angular/core';

// Models
import { Article } from '../../models/article.interface';

@Component({
    selector: 'news-article-display',
    styleUrls: ['article-display.component.scss'],
    templateUrl: 'article-display.component.html',
})
export class NewsArticleDisplayComponent {
    @Input() article: Article;

    constructor() { }
}
