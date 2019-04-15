import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


// Routes
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Header
import { HeaderModule } from './core/header/header.module';

// Auth Module
import { AuthModule } from './core/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
