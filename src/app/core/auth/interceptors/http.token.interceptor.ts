import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// Rxjs
import { Observable } from 'rxjs';

// Services
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: ''
        };
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.token) {
            headers.Authorization = `Bearer ${currentUser.token}`;
        }
        const request = httpRequest.clone({ setHeaders: headers });
        return next.handle(request);
    }
}
