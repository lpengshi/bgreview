<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { BoardgamesComponent } from './components/boardgames.component';
import { ApprouteModule } from './approute.module';
import { BoardgameService } from './boardgame.service';
import { CategoriesComponent } from './components/categories.component';
||||||| merged common ancestors
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { BoardgamesComponent } from './components/boardgames.component';
import { ApprouteModule } from './approute.module';
import { BoardgameService } from './boardgame.service';
import { CategoriesComponent } from './components/categories.component';
=======
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material.module";
>>>>>>> 9904efae0c39338f3a80260a282d4201528da80b

import { AppComponent } from "./app.component";
import { BoardgamesComponent } from "./components/boardgames.component";
import { ApprouteModule } from "./approute.module";
import { BoardgameService } from "./boardgame.service";
import { CategoriesComponent } from "./components/categories.component";
import { CommentsComponent } from "./components/comments.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GameDetailComponent } from './components/game-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardgamesComponent,
    CategoriesComponent,
    CommentsComponent,
    GameDetailComponent
  ],
  imports: [
<<<<<<< HEAD
    BrowserModule,  BrowserAnimationsModule,
    HttpClientModule, MaterialModule, ApprouteModule,
    MatPaginatorModule,
||||||| merged common ancestors
    BrowserModule,  BrowserAnimationsModule,
    HttpClientModule, MaterialModule, ApprouteModule
=======
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ApprouteModule,
    FormsModule,
    ReactiveFormsModule
>>>>>>> 9904efae0c39338f3a80260a282d4201528da80b
  ],
  providers: [BoardgameService],
  bootstrap: [AppComponent]
})
export class AppModule {}
