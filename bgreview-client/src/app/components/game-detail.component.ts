import { Component, OnInit, Input } from '@angular/core';
import { BoardgameDetail, Boardgame, Snippet } from '../model';
import { BoardgameService } from '../boardgame.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styles: []
})
export class GameDetailComponent implements OnInit {

  gameId = "";

  bgdetail: BoardgameDetail = { id: '', name: '', thumbnail: '', alternate: [], artist: [], category: [], designer: [], family: [], mechanic: [], publisher: [], description: '', image: '', maxplayers: '', playing_time: 0, year_published: 0, rank: 0, average: 0, bayes_average: 0, users_rated: 0 }

  snippet: Snippet = { id: '', name: '', thumbnail: '', alternate: []}
  
  constructor(readonly activatedRoute: ActivatedRoute,
    readonly boardgameSvc: BoardgameService,
    readonly route: Router) { }

  ngOnInit() {
    this.gameId = this.activatedRoute.snapshot.params.gameId;

    this.boardgameSvc
    .boardgameDetail(this.gameId)
    .then(result => {
      console.info(">>> result: ", result);
      this.bgdetail = result;
    }).catch(error => {
      console.info(">>> error: ", error);
    })

    this.boardgameSvc
    .getSnippet(this.gameId)
    .then(result => {
      console.info(">>> result: ", result);
      this.snippet = result;
    }).catch(error => {
      console.info(">>> error: ", error);
    })
  }
}
