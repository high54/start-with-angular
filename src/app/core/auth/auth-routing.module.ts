import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import * as fromPages from './pages';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: fromPages.AppLoginComponent
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }