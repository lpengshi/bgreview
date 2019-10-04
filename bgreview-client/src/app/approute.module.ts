import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardgamesComponent } from "./components/boardgames.component";
import { CategoriesComponent } from "./components/categories.component";
import { CommentsComponent } from "./components/comments.component";
import { GameDetailComponent } from "./components/game-detail.component";

const ROUTES: Routes = [
  { path: "", component: CategoriesComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "boardgames", component: BoardgamesComponent },
  { path: "boardgames/:category", component: BoardgamesComponent },
  { path: "boardgame/:gameId/comments", component: CommentsComponent },
  { path: "boardgame/:gameId", component: GameDetailComponent },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class ApprouteModule {}
