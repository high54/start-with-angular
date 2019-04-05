import { Component, OnInit, OnDestroy } from '@angular/core';
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
})
export class NewsArticleFormComponent implements OnInit, OnDestroy {
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

    ngOnDestroy(): void {
        if (this.isEdit) {
            this.article$.unsubscribe();
        }
    }


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
