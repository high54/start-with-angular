import { Injectable } from '@angular/core';
import { Comment } from '../../models/comment.interface';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CommentService {
    private api = 'http://localhost:3000';
    constructor(
        private http: HttpClient
    ) { }

    /**
     * Ajoute un commentaire en base de données via une requête HTTP(S) à l'API
     * @param payload Comment object
     */
    createComment(payload: Comment): Observable<Comment> {
        return this.http
            .post<Comment>(`${this.api}/comments`, payload)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }

    /**
     * Retourne la liste des commentaires attaché à un article via son ID.
     * Les commentaires sont modéré
     * @param articleId Article object ID
     */
    getCommentsByArticle(articleId: number): Observable<Comment[]> {
        return this.http
            .get<Comment[]>(`${this.api}/comments?articleId=${articleId}&isModerate=true`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
    /**
     * Retourne la liste de tous les commentaires qui ne sont pas encore modéré
     */
    getComments(): Observable<Comment[]> {
        return this.http
            .get<Comment[]>(`${this.api}/comments?isModerate=false`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }

    /**
     * Met à jour un commentaire via une requête HTTP(s) à l'API
     * @param payload Comment object
     */
    updateComment(payload: Comment): Observable<Comment> {
        return this.http
            .put<Comment>(`${this.api}/comments/${payload.id}`, payload)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
    /**
     * Supprime un commentaire via une requête HTTP(S) à l'API
     * @param payload Comment Object
     */
    removeComment(payload: Comment): Observable<Comment> {
        return this.http
            .delete<any>(`${this.api}/comments/${payload.id}`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
}
