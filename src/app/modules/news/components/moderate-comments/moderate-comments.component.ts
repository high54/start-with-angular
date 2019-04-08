import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommentService } from '../../services';
import { Subscription, Observable } from 'rxjs';
import { Comment } from '../../models/comment.interface';

@Component({
    selector: 'news-moderate-comments',
    styleUrls: ['moderate-comments.component.scss'],
    templateUrl: 'moderate-comments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsModerateCommentsComponent implements OnInit {
    comments$: Observable<Comment[]>;
    constructor(
        private commentService: CommentService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.fetchData();
    }
    /**
     * Valide ou supprime un commentaire
     * @param comment Commentaire à valider ou supprimer
     * @param isValid boolean, True si commentaire à valider, False si commentaire à supprimer
     */
    moderateComment(comment: Comment, isValid: boolean): void {
        if (isValid) {
            comment.isModerate = isValid;
            this.commentService.updateComment(comment).toPromise().then((updateCommentResolve) => {
                this.fetchData();
            }, (updateCommentReject) => {
                window.confirm(updateCommentReject);
            });
        } else {
            this.commentService.removeComment(comment).toPromise().then((removeCommentResolve) => {
                this.fetchData();
            }, (removeCommentReject) => {
                window.confirm(removeCommentReject);
            });
        }
    }

    /**
     * Récupérer depuis le service des commentaires la liste des commentaires qui n'ont pas été modéré
     * puis lance une détéction des changements sur le composant
     */
    private fetchData(): void {
        this.comments$ = this.commentService.getComments();
        this.cdr.detectChanges();
    }
}
