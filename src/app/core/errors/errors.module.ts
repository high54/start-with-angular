import { NgModule } from '@angular/core';

// Pages
import * as fromPages from './pages';

// Routes
import { ErrorsRoutingModule } from './errors-routing.module';

@NgModule({
    imports: [
        ErrorsRoutingModule
    ],
    declarations: [
        ...fromPages.pages
    ],
    providers: []
})
export class ErrorsModule { }
