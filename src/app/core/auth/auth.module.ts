import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Pages
import * as fromPages from './pages';
// Routes
import { AuthRoutingModule } from './auth-routing.module';
// Services
import * as fromServices from './services';
// Interceptors
import * as fromInterceptors from './interceptors';
import { fakeBackendProvider } from './interceptors/fakeBackend.interceptor';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        HttpClientModule
    ],
    declarations: [
        ...fromPages.pages
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.HttpTokenInterceptor, multi: true },
        ...fromServices.services,
        fakeBackendProvider
    ]
})
export class AuthModule { }
