import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { BoardgamesComponent } from './components/boardgames.component';
import { CategoriesComponent } from './components/categories.component';
import { CommentsComponent } from "./components/comments.component";
import { GameDetailComponent } from './components/game-detail.component';

import { ApprouteModule } from './approute.module';
import { BoardgameService } from './boardgame.service';

@NgModule({
  declarations: [
    AppComponent, BoardgamesComponent,
    CategoriesComponent, CommentsComponent,
    GameDetailComponent
  ],
  imports: [
    BrowserModule,  BrowserAnimationsModule,
    HttpClientModule, MaterialModule, ApprouteModule,
    MatPaginatorModule, FormsModule, ReactiveFormsModule
  ],
  providers: [BoardgameService],
  bootstrap: [AppComponent]
})
export class AppModule {}
