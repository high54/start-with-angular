import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from '../../models/comment.interface';

@Component({
    selector: 'news-article-comments',
    styleUrls: ['article-comments.component.scss'],
    templateUrl: 'article-comments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsArticleCommentsComponent {
    @Input() comment: Comment;
    constructor() { }
}
