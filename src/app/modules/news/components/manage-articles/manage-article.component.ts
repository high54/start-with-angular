import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { ArticleService } from '../../services';
// Models
import { Article } from '../../models/article.interface';
import { Router } from '@angular/router';

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
    ngOnInit() {
        this.fetchData();
    }
    editArticle(article: Article) {
        console.log('Edition');
    }

    /**
     * Effectue une demande de confirmation avant de supprimer un article.
     * Utilise le service ArticleService pour effectuer une requête HTTP à l'API
     * @param article Article object
     */
    removeArticle(article: Article) {
        const remove = window.confirm(`Êtes-vous sur de vouloir supprimer l'article ?`);
        if (remove) {
            this.articleService.removeArticle(article).toPromise().then((removeArticleResponse) => {
                this.fetchData();
            }, (rejectRemoveArticleResponse) => {
                console.error(rejectRemoveArticleResponse);
            });
        }
    }

    private fetchData(): void {
        this.articles$ = this.articleService.getArticles();
    }

}
