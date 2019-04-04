import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Pages
import * as fromPages from './pages';

// Components
import * as fromComponents from './components';

// Services
import * as fromServices from './services';

// Routes
import { NewsRoutingModule } from './news-routing.module';

// Pipes
import * as fromPipes from './pipes';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NewsRoutingModule
    ],
    declarations: [
        ...fromPages.pages,
        ...fromComponents.components,
        ...fromPipes.pipes
    ],
    providers: [
        ...fromServices.services
    ]
})
export class NewsModule { }
