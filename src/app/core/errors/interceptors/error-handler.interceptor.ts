import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(): Observable<any> {
        return of(true);
    }
}
