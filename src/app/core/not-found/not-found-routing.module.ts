import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import * as fromPages from './pages';

const routes: Routes = [
  {
    path: '**',
    component: fromPages.NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
