import { NgModule } from '@angular/core';

// Components
import * as fromComponents from './components';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        ...fromComponents.components
    ],
    declarations: [
        ...fromComponents.components
    ],
    providers: []
})
export class HeaderModule { }
