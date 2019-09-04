import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material.module";

import { AppComponent } from "./app.component";
import { BoardgamesComponent } from "./components/boardgames.component";
import { ApprouteModule } from "./approute.module";
import { BoardgameService } from "./boardgame.service";
import { CategoriesComponent } from "./components/categories.component";
import { CommentsComponent } from "./components/comments.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    BoardgamesComponent,
    CategoriesComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ApprouteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BoardgameService],
  bootstrap: [AppComponent]
})
export class AppModule {}
