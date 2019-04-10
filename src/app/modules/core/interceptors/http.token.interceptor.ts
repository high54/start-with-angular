import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
        const token = false; // TODO
        if (token) {
            headers['Authorization'] = `Token ${token}`;
        }
        const request = httpRequest.clone({ setHeaders: headers });
        return next.handle(request);
    }
}
