import { NgModule } from '@angular/core';

// Pages
import * as fromPages from './pages';

// Routes
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
    imports: [
        NotFoundRoutingModule
    ],
    declarations: [
        ...fromPages.pages
    ]
})
export class NotFoundModule { }
