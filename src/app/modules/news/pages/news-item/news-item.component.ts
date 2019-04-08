import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Rxjs
import { Observable } from 'rxjs';
// Models
import { Article } from '../../models/article.interface';
import { Comment } from '../../models/comment.interface';
// Services
import { ArticleService, CommentService } from '../../services';

@Component({
    selector: 'app-news-item',
    styleUrls: ['news-item.component.scss'],
    templateUrl: 'news-item.component.html',
})
export class NewsItemComponent implements OnInit {
    article$: Observable<Article>;
    comments$: Observable<Comment[]>;
    constructor(
        private articleService: ArticleService,
        private commentService: CommentService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.route.snapshot.params.articleId) {
            this.article$ = this.articleService.getArticle(this.route.snapshot.params.articleId);
            this.comments$ = this.commentService.getCommentsByArticle(this.route.snapshot.params.articleId);
        } else {
            this.router.navigate(['../']);
        }
    }
}
