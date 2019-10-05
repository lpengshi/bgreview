import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BoardgameService } from "../boardgame.service";
import { BoardgameList } from "../model";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-boardgames",
  templateUrl: "./boardgames.component.html",
  styleUrls: ["./boardgames.component.css"]
})
export class BoardgamesComponent implements OnInit {
  category = "";
  searchQuery = "";
  boardgameList: BoardgameList = { boardgames: [] };

  // MatPaginator Input
  length = this.boardgameList.boardgames.length;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];
    
  // MatPaginator Output
  pageEvent: PageEvent;
  activeBoardgamePage = [];

  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly boardgameSvc: BoardgameService,
    readonly router: Router
  ) {}

  ngOnInit() {
    this.category = this.activatedRoute.snapshot.params.category;
    if (this.category != null) {
      console.info(">>> category: ", this.category);
      this.boardgameSvc
        .category(this.category)
        .then(result => {
          this.boardgameList = result;
          this.activeBoardgamePage = this.boardgameList.boardgames.slice(0,
            this.pageSize
          );
        })
        .catch(error => {
          console.error(">> error: ", error);
        });
    } 

    this.searchQuery = this.activatedRoute.snapshot.queryParamMap.get("name")
    if (this.searchQuery != null) {
      console.log(">> input: ", this.searchQuery);
      this.boardgameSvc
      .boardgames(this.searchQuery)
      .then(result => {
        this.boardgameList = result;
        this.activeBoardgamePage = this.boardgameList.boardgames.slice(0,
          this.pageSize
        );
      })
      .catch(error => {
        console.error(">> error: ", error);
      });
    }
  }

  selected(text) {
    console.info("selected boardgame: ", text);
    this.router.navigate(["/boardgame/", text]);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activeBoardgamePage = this.boardgameList.boardgames.slice(
      firstCut,
      secondCut
    );
    window.scrollTo(0, 0);
  }
}
