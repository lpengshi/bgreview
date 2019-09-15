import { Component, OnInit } from '@angular/core';
import { BoardgameService } from '../boardgame.service';
import { Boardgames } from '../model';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-boardgames',
  templateUrl: './boardgames.component.html',
  styleUrls: ['./boardgames.component.css']
})
export class BoardgamesComponent implements OnInit {

  boardgames: Boardgames = { boardgames: [] };
  length: number;
  pageSize: number;
  pageSizeOptions: number[] = [10, 20, 40];

  constructor(readonly boardgameSvc: BoardgameService, readonly router: Router) { }

  ngOnInit() {
    this.boardgameSvc.boardgames()
      .then(result => {
        this.boardgames = result;
        this.length = this.boardgames.boardgames.length;
        this.pageSize = this.length;
      })
      .catch(error => {
        console.error('>> error: ', error);
      })
  }

  selected(text) {
    console.info('selected boardgame: ', text);
    this.router.navigate([ '/boardgames', text ])
  }

  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}