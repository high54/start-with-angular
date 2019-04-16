import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Rxjs
import { Subscription } from 'rxjs';
// Services
import { ArticleService } from '../../services';
// Models
import { Article } from '../../models/article.interface';
import { Comment } from '../../models/comment.interface';

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
    pageTitle = `Ajouter un article`;
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
            this.pageTitle = `Modifier un article`;
            this.article$ = this.route.data.subscribe((data: { article_comments: { article: Article, comments: Comment[] } }) => {
                const { article } = data.article_comments;
                this.article = article;
                this.articleForm.patchValue(this.article);

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
    addOrEditArticle(form: FormGroup): void {
        const { valid, value } = form;
        // Si les champs du formulaire sont valide alors...
        if (valid) {
            // S'il s'agit d'une modification d'artile
            if (this.isEdit) {
                this.articleService.updateArticle({ ...this.article, ...value }).toPromise().then((updateArticleRes) => {
                    this.router.navigate(['/news/admin/', { outlets: { 'news-admin': ['manage-articles'] } }]);
                }, (updateArticleRej) => {
                    window.confirm(updateArticleRej);
                });
            } else {
                // Sinon, il s'agit de l'ajout d'un article
                value.author = {
                    fullName: 'Author N'
                };
                // Demande au service d'ajouter l'article et redirige l'utilisateur vers la liste des articles
                this.articleService.createArticle(value).toPromise().then((createArticleRes) => {
                    this.router.navigate(['/news/admin/', { outlets: { 'news-admin': ['manage-articles'] } }]);
                }, (createArticleRej) => {
                    window.confirm(createArticleRej);
                });
            }
        } else {
            // Sinon, on affiche une alerte dans le navigateur.
            window.confirm(`Veuillez compléter l'intégralité du formulaire.`);
        }
    }

    /**
     * Redirige l'utilisateur à la liste des articles
     */
    cancel(): void {
        this.router.navigate(['/news/admin/']);
    }

    /**
     *  Getter pour lever les erreurs sur le formulaire et les afficher à l'utilisateur.
     *  Retourne un champ du formulaire sous forme d'AbstractControl
     *  permettant ainsi d'accéder aux propriétés (isValid, touched, required, etc...).
     */

    get title(): AbstractControl {
        return this.articleForm.get('title');
    }

    get description(): AbstractControl {
        return this.articleForm.get('description');
    }

    get content(): AbstractControl {
        return this.articleForm.get('content');
    }
}
