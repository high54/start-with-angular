import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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

// Directives
import * as fromDirectives from './directives';

// Resolvers
import * as fromResolvers from './resolvers';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NewsRoutingModule
    ],
    declarations: [
        ...fromPages.pages,
        ...fromComponents.components,
        ...fromPipes.pipes,
        ...fromDirectives.directives
    ],
    providers: [
        ...fromServices.services,
        ...fromResolvers.resolvers
    ]
})
export class NewsModule { }
