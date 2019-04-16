import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
// Rxjs
import { Subscription } from 'rxjs';
// Services
import { CommentService } from '../../services';
// Models
import { Comment } from '../../models/comment.interface';

@Component({
    selector: 'news-comment-form',
    styleUrls: ['comment-form.component.scss'],
    templateUrl: 'comment-form.component.html',
})
export class NewsCommentFormComponent implements OnDestroy {
    @Input() articleId: number;
    postCommentSubscription: Subscription;
    // Affiche le formulaire ou un message
    isCommented = false;
    commentForm = this.fb.group({
        username: ['', Validators],
        comment: ['', Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private commentService: CommentService
    ) { }

    /**
     * Demande au service "CommentService" d'ajouter un commentaire
     * @param form Formulaire du template HTML
     */
    postComment(form: FormGroup): void {
        const { valid, value } = form;
        if (valid) {
            // Objet Comment construit à partir des données du formulaire et de l'ID de l'article.
            const comment: Comment = {
                author: {
                    fullName: value.username
                },
                content: value.comment,
                articleId: this.articleId,
                isModerate: false
            };
            this.postCommentSubscription = this.commentService.createComment(comment).subscribe((reateCommentResp) => {
                this.commentForm.reset();
                this.isCommented = true;
            }, (err) => {
                window.confirm(err);
            });
        } else {
            window.confirm('Les champs sont obligatoires.');
        }
    }

    /**
     * On Destroy, désinscription pour éviter toutes fuites de mémoires.
     */
    ngOnDestroy(): void {
        if (this.postCommentSubscription) {
            this.postCommentSubscription.unsubscribe();
        }
    }

    /**
     * Getter pour la validation visuel du formulaire
     */
    get username(): AbstractControl {
        return this.commentForm.get('username');
    }
    get comment(): AbstractControl {
        return this.commentForm.get('comment');
    }
}
