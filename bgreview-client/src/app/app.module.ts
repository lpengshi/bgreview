import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { BoardgamesComponent } from './components/boardgames.component';
import { ApprouteModule } from './approute.module';
import { BoardgameService } from './boardgame.service';


@NgModule({
  declarations: [
    AppComponent, BoardgamesComponent
  ],
  imports: [
    BrowserModule,  BrowserAnimationsModule,
    HttpClientModule, MaterialModule, ApprouteModule
  ],
  providers: [BoardgameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
