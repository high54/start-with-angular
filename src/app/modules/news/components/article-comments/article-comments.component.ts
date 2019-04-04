import { Component, Input } from '@angular/core';

@Component({
    selector: 'news-article-comments',
    styleUrls: ['article-comments.component.scss'],
    templateUrl: 'article-comments.component.html',
})
export class NewsArticleCommentsComponent {
    @Input() comment: Comment;
    constructor() { }
}
