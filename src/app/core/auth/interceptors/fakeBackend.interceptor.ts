import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
// Rxjs
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// Models
import { User } from '../models/user.interface';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Mise en place de deux utilisateus avec des rôles différents
        const users: User[] = [
            { id: 1, username: 'admin', password: 'admin', firstName: 'admin', lastName: 'admin', email: 'admin@exemple.com', role: 'admin' },
            { id: 2, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', email: 'user@exemple.com', role: 'user' }

        ];

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        // Ajout un delai pour simuler l'API
        return of(null).pipe(mergeMap(() => {

            // Si la requête pointe sur le end point "/auth" et qu'il s'agit d'un POST
            // On récupére les identifiants dans la requête pour les comparer avec notre tableau ci dessus
            if (request.url.endsWith('/auth') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) {
                    return error('Username or password is incorrect');
                }
                // Map les informations de l'utilisateur pour les retourner
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    token: `fake-jwt-token`,
                    role: user.role
                });
            }

            // Laisse passer toutes les requêtes qui ne correspondent pas à la méthode POST et au end point "/auth"
            return next.handle(request);
        }))
            // appelle materialize et dematerialize pour s'assurer d'ajouter un delai même si un erreur est levée
            // (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        // private helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};