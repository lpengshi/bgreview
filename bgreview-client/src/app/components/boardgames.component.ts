import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BoardgameService } from "../boardgame.service";
import { BoardgameList } from "../model";
import { PageEvent, MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-boardgames",
  templateUrl: "./boardgames.component.html",
  styleUrls: ["./boardgames.component.css"]
})
export class BoardgamesComponent implements OnInit {
  category = "";
  searchQuery = "";
  boardgameList: BoardgameList = { boardgames: [] , total_count: 0};
  loading = true;

  // MatPaginator Input
  length = this.boardgameList.boardgames.length;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  activeBoardgamePage = [];

  @ViewChild('paginator', {static: false}) paginator: MatPaginator;

  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly boardgameSvc: BoardgameService,
    readonly router: Router
  ) {}

  ngOnInit() {
    this.getBoardgameList();
  }

  getBoardgameList(){
    this.category = this.activatedRoute.snapshot.params.category;
    if (this.category != null) {
      console.info(">>> category: ", this.category);
      this.boardgameSvc
        .category({category: this.category, offset: this.pageIndex, limit: this.pageSize})
        .then(result => {
          this.loading = false;
          this.boardgameList = result;
          this.activeBoardgamePage = this.boardgameList.boardgames;
          this.length = this.boardgameList.total_count;
        })
        .catch(error => {
          this.loading = false;
          console.error(">> error: ", error);
        });
    }

    this.searchQuery = this.activatedRoute.snapshot.queryParamMap.get("name");
    if (this.searchQuery != null) {
      console.log(">> input: ", this.searchQuery);
      this.boardgameSvc
        .boardgames({name: this.searchQuery, offset: this.pageIndex, limit: this.pageSize})
        .then(result => {
          this.loading = false;
          this.boardgameList = result;
          this.activeBoardgamePage = this.boardgameList.boardgames;
          this.length = this.boardgameList.total_count;
        })
        .catch(error => {
          this.loading = false;
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
    if(e.pageSize != this.pageSize){
      this.pageSize = e.pageSize;
      this.pageIndex = 0;
      this.paginator.firstPage();
      this.getBoardgameList();
    }else{
      this.pageIndex = e.pageIndex;
      this.getBoardgameList();
    }
    this.loading = true;
    window.scrollTo(0, 0);
  }
}
