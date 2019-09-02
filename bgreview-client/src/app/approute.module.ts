import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { BoardgamesComponent } from './components/boardgames.component';
import { CategoriesComponent } from './components/categories.component';

const ROUTES: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'boardgames/:categories', component: BoardgamesComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})
export class ApprouteModule { }
