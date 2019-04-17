import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import * as fromPages from './pages';

// Routes
const routes: Routes = [
    {
      path: '**',
      component: fromPages.ErrorsNotFoundComponent
    }
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorsRoutingModule {}
