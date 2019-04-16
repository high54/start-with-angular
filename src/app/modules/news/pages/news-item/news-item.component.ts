import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Rxjs
import {Subscription } from 'rxjs';
// Models
import { Article } from '../../models/article.interface';
import { Comment } from '../../models/comment.interface';

@Component({
    selector: 'app-news-item',
    styleUrls: ['news-item.component.scss'],
    templateUrl: 'news-item.component.html',
})
export class NewsItemComponent implements OnInit, OnDestroy {
    article$: Subscription;
    article: Article;
    comments: Comment[];
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    /**
     * Récupére l'article et les commentaires lié à l'article depuis la route
     * Sinon redirige vers la page d'accueil
     */
    ngOnInit(): void {
        if (this.route.snapshot.params.articleId) {
            this.article$ = this.route.data.subscribe((data: { article_comments: { article: Article, comments: Comment[] } }) => {
                const { article, comments } = data.article_comments;
                this.article = article;
                this.comments = comments;
            });
        } else {
            this.router.navigate(['../']);
        }
    }

    /**
     * On Destroy, désinscription de l'observable pour éviter les fuites mémoires.
     */
    ngOnDestroy(): void {
        this.article$.unsubscribe();
    }
}
