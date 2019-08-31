import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { BoardgamesComponent } from './components/boardgames.component';

const ROUTES: Routes = [
  { path: '', component: BoardgamesComponent },
  { path: 'boardgames', component: BoardgamesComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})
export class ApprouteModule { }
