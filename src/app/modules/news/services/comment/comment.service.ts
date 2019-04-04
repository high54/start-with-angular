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

    createComment(payload: Comment): Observable<Comment> {
        return this.http
            .post<Comment>(`${this.api}/comments`, payload)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }

    getComments(articleId: number): Observable<Comment[]> {
        return this.http
            .get<Comment[]>(`${this.api}/comments?articleId=${articleId}`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }

    updateComment(payload: Comment): Observable<Comment> {
        return this.http
            .put<Comment>(`${this.api}/comments/${payload.id}`, payload)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }

    removeComment(payload: Comment): Observable<Comment> {
        return this.http
            .delete<any>(`${this.api}/comments/${payload.id}`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
}
