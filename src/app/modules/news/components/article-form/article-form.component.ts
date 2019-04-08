import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Rxjs
import { Observable, Subscriber, Subscription } from 'rxjs';
// Services
import { ArticleService } from '../../services';
// Models
import { Article } from '../../models/article.interface';
@Component({
    selector: 'news-article-form',
    styleUrls: ['article-form.component.scss'],
    templateUrl: 'article-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsArticleFormComponent implements OnInit, OnDestroy {
    // Champs du formulaire disponible dans le template
    articleForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        content: ['', Validators.required]
    });
    title = `Ajouter un article`;
    article$: Subscription;

    private isEdit = false;
    private article: Article;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private articleService: ArticleService
    ) { }
    /**
     * Si un ID est passé en paramètre, alors il s'agit de l'édition d'un article
     * Dans ce cas, nous modifions le titre du composant et via le service des articles nous allons récupérer les données.
     * Puis nous ajoutons les données de l'article au formulaire via patchValue.
     */
    ngOnInit(): void {
        if (this.route.snapshot.params.articleId) {
            this.isEdit = true;
            this.title = `Modifier un article`;
            this.article$ = this.articleService.getArticle(this.route.snapshot.params.articleId).subscribe(articleRes => {
                this.article = articleRes;
                this.articleForm.patchValue(articleRes);
            });
        }
    }
    /**
     * Pour éviter les fuites de mémoires, s'il s'agit de l'édition d'un article
     * nous effectuons une désinscription
     */
    ngOnDestroy(): void {
        if (this.isEdit) {
            this.article$.unsubscribe();
        }
    }

    /**
     * S'il s'agit de l'édition' d'un article, nous demandons au service de mettre à jour l'article.
     * En cas de réussite, l'utilisateur est redirigé vers la liste des articles à l'accueil de l'administration des news
     * 
     * S'il s'agit de l'ajout d'un article, nous demandons au service de l'ajouter.
     * En cas de réussite, l'utilisateur est également redirigé vers la liste des articles
     * 
     * En cas d'échec dans les deux cas, une fenêtre s'affiche pour indiquer l'erreur.
     * 
     * @param form Données du formulaire présent dans le template
     */
    addOrEditArticle(form: FormControl): void {
        const { valid, value } = form;
        if (valid) {
            if (this.isEdit) {
                this.articleService.updateArticle({ ...this.article, ...value }).toPromise().then((updateArticleRes) => {
                    this.router.navigate(['/news/admin/', { outlets: { 'news-admin': ['manage-articles'] } }]);
                }, (updateArticleRej) => {
                    window.confirm(updateArticleRej);
                });
            } else {
                value.author = {
                    fullName: 'Author N'
                };
                this.articleService.createArticle(value).toPromise().then((createArticleRes) => {
                    this.router.navigate(['/news/admin/', { outlets: { 'news-admin': ['manage-articles'] } }]);
                }, (createArticleRej) => {
                    window.confirm(createArticleRej);
                });
            }
        } else {
            window.confirm(`Veuillez compléter l'intégralité du formulaire.`);
        }
    }
}
