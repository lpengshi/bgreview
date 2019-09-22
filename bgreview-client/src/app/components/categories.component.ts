import { Component, OnInit } from '@angular/core';
import { BoardgameService } from '../boardgame.service';
import { Categories } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Categories = { categories: [] }
  searchInput: string

  constructor(readonly boardgameSvc: BoardgameService, readonly router: Router) { }

  ngOnInit() {
    this.boardgameSvc.categories()
      .then(result => {
        this.categories = result;
      })
      .catch(error => {
        console.error('>> error: ', error);
      })
  }

  selected(text) {
    console.info('selected category: ', text);
    this.router.navigate([ '/boardgames', text ]);
  }

  onSubmit() {
    if (this.searchInput == undefined) {
      this.searchInput = '';
    }
    console.info('Search Input: ', this.searchInput);
    this.router.navigate([ '/boardgames', this.searchInput ]);
  }

}