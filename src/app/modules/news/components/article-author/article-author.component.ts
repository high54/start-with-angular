import { Component, Input } from '@angular/core';

// Models
import { Author } from '../../models/author.interface';

@Component({
    selector: 'news-article-author',
    styleUrls: ['article-author.component.scss'],
    templateUrl: 'article-author.component.html',
})
export class NewsArticleAuthorComponent {
    @Input() author: Author;
    constructor() { }
}
