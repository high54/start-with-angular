import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Pages
import * as fromPages from './pages';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        ...fromPages.pages
    ],
    exports: [
        ...fromPages.pages
    ]
})
export class UiModule { }
