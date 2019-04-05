import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Rxjs
import { Observable } from 'rxjs';
// Services
import { ArticleService } from '../../services';
// Models
import { Article } from '../../models/article.interface';

@Component({
    selector: 'news-manage-article',
    styleUrls: ['manage-article.component.scss'],
    templateUrl: 'manage-article.component.html',
})
export class NewsManageArticlesComponent implements OnInit {
    articles$: Observable<Article[]>;
    constructor(
        private articleService: ArticleService,
        private router: Router
    ) { }
    /**
     * Fait référence à la méthode qui utilise ArticleService
     */
    ngOnInit(): void {
        this.fetchData();
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
     * Utilise ArticleService pour récupérer les articles
     */
    private fetchData(): void {
        this.articles$ = this.articleService.getArticles();
    }

}
