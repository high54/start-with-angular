import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

// Models
import { Author } from '../../models/author.interface';

@Component({
    selector: 'news-article-author',
    styleUrls: ['article-author.component.scss'],
    templateUrl: 'article-author.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsArticleAuthorComponent {
    @Input() author: Author;
    constructor() { }
}
