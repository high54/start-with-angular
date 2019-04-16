import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Article } from '../../models/article.interface';
import { ArticleService, CommentService } from '../../services';
import { Comment } from '../../models/comment.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleResolver implements Resolve<{ article: Article, comments: Comment[] }> {
    constructor(
        private articleService: ArticleService,
        private commentService: CommentService
    ) { }

    /**
     * Retourne un observable contenant un article et les commentaires lié à l'article
     * @param route ActivatedRouteSnapshot
     */
    resolve(route: ActivatedRouteSnapshot): Observable<{ article: Article, comments: Comment[] }> {
        const articleId = parseInt(route.paramMap.get('articleId'), 10);
        // forkJoin permet d'attendre la résolution des deux traitement asynchrone, puis les retournes en un seul objet
        return forkJoin(this.articleService.getArticle(articleId), this.commentService.getCommentsByArticle(articleId))
            .pipe(map(([article, comments]) => {
                return { article, comments };
            }));
    }
}
