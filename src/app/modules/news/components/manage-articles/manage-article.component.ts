import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Rxjs
import { Observable } from 'rxjs';
// Services
import { ArticleService } from '../../services';
// Models
import { Article } from '../../models/article.interface';
import { map } from 'rxjs/operators';

@Component({
    selector: 'news-manage-article',
    styleUrls: ['manage-article.component.scss'],
    templateUrl: 'manage-article.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsManageArticlesComponent implements OnInit {
    articles$: Observable<Article[]>;
    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }
    /**
     * Fait référence à la méthode qui utilise ArticleService
     */
    ngOnInit(): void {
        this.articles$ = this.route.data.pipe(map((data: { articles: Article[] }) => data.articles));
    }
    /**
     * Redirige l'utilisateur sur le composant "article-form"
     */
    addArticle(): void {
        this.router.navigate(['/news/admin/', { outlets: { 'news-admin': ['article-form'] } }]);
    }
    /**
     * Redirige l'utilisateur sur le composant "article-form" avec l'ID de l'article à modifier
     * @param article Article Object
     */
    editArticle(article: Article): void {
        this.router.navigate(['/news/admin/', { outlets: { 'news-admin': ['article-form', article.id] } }]);

    }

    /**
     * Effectue une demande de confirmation avant de supprimer un article.
     * Utilise le service ArticleService pour effectuer une requête HTTP à l'API
     * @param article Article object
     */
    removeArticle(article: Article): void {
        const remove = window.confirm(`Êtes-vous sur de vouloir supprimer l'article ?`);
        if (remove) {
            this.articleService.removeArticle(article).toPromise().then((removeArticleResponse) => {
                this.fetchData();
            }, (removeArticleRej) => {
                window.confirm(removeArticleRej);
            });
        }
    }
    /**
     * Utilise ArticleService pour récupérer la liste des articles puis met à jour l'affichage
     */
    private fetchData(): void {
        this.articles$ = this.articleService.getArticles();
        this.cdr.detectChanges();
    }

}
