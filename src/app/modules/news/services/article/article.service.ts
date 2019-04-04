import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// Models
import { Article } from '../../models/article.interface';
@Injectable()
export class ArticleService {
    private api = 'http://localhost:3000';
    constructor(
        private http: HttpClient
    ) { }

    /**
     * Ajoute un article en base de données
     * @param payload Article object
     */
    createArticle(payload: Article): Observable<Article> {
        return this.http
            .post<Article>(`${this.api}/articles`, payload)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
    /**
     * Récupère tous les articles
     */
    getArticles(): Observable<Article[]> {
        return this.http
            .get<Article[]>(`${this.api}/articles`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
    /**
     * Récupère un article en fonction de son ID
     * @param articleId ID of Article Object
     */
    getArticle(articleId: number): Observable<Article> {
        return this.http
            .get<Article>(`${this.api}/articles/${articleId}`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
    /**
     * Met à jour un article en base de données
     * @param payload Article object
     */
    updateArticle(payload: Article): Observable<Article> {
        return this.http
            .put<Article>(`${this.api}/articles/${payload.id}`, payload)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
    /**
     * Supprime un article en base de données
     * @param payload Article object
     */
    removeArticle(payload: Article): Observable<Article> {
        return this.http
            .delete<any>(`${this.api}/articles/${payload.id}`)
            .pipe(catchError((error: any) => throwError(JSON.stringify(error))));
    }
}
