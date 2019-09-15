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


@NgModule({
  declarations: [
    AppComponent, BoardgamesComponent, CategoriesComponent,
  ],
  imports: [
    BrowserModule,  BrowserAnimationsModule,
    HttpClientModule, MaterialModule, ApprouteModule,
    MatPaginatorModule,
  ],
  providers: [BoardgameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
