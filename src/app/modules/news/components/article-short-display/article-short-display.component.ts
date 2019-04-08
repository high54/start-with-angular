import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../../models/article.interface';

@Component({
    selector: 'news-article-short-dsiplay',
    styleUrls: ['article-short-display.component.scss'],
    templateUrl: 'article-short-display.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsArticleShortDisplayComponent {
    @Input() article: Article;
    constructor() { }
}
