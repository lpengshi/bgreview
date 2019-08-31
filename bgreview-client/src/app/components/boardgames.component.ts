import { Component, OnInit } from '@angular/core';
import { BoardgameService } from '../boardgame.service';
import { Boardgames } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boardgames',
  templateUrl: './boardgames.component.html',
  styleUrls: ['./boardgames.component.css']
})
export class BoardgamesComponent implements OnInit {

  boardgames: Boardgames = { boardgames: [] }

  constructor(readonly boardgameSvc: BoardgameService, readonly router: Router) { }

  ngOnInit() {
    this.boardgameSvc.boardgames()
      .then(result => {
        this.boardgames = result;
      })
      .catch(error => {
        console.error('>> error: ', error);
      })
  }

  selected(text) {
    console.info('selected boardgame: ', text);
    this.router.navigate([ '/boardgames', text ])
  }

}