import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

// Models
import { Article } from '../../models/article.interface';

@Component({
    selector: 'news-article-display',
    styleUrls: ['article-display.component.scss'],
    templateUrl: 'article-display.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsArticleDisplayComponent {
    @Input() article: Article;

    constructor() { }
}
