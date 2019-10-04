import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BoardgameService } from "../boardgame.service";
import { Boardgames } from "../model";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-boardgames",
  templateUrl: "./boardgames.component.html",
  styleUrls: ["./boardgames.component.css"]
})
export class BoardgamesComponent implements OnInit {
  category = "";
  boardgames: Boardgames = { boardgames: [] };
  length: number;
  pageSize: number;
  pageSizeOptions: number[] = [10, 20, 40];

  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly boardgameSvc: BoardgameService,
    readonly router: Router
  ) {}

  ngOnInit() {
    this.boardgameSvc
      .boardgames(this.activatedRoute.snapshot.queryParamMap.get("name"))
      .then(result => {
        console.log(
          ">> query: ",
          this.activatedRoute.snapshot.paramMap.get("name")
        );
        this.boardgames = result;
        this.length = this.boardgames.boardgames.length;
        this.pageSize = this.length;
      })
      .catch(error => {
        console.error(">> error: ", error);
      });

    /*this.category = this.activatedRoute.snapshot.params.category;
    console.info(">>> category: ", this.category);
    this.boardgameSvc
      .category(this.category)
      .then(result => {
        this.boardgames = result;
        this.length = this.boardgames.boardgames.length;
        this.pageSize = this.length;
      })
      .catch(error => {
        console.error(">> error: ", error);
      });*/
  }

  selected(text) {
    console.info("selected boardgame: ", text);
    this.router.navigate(["/boardgames", text]);
  }

  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }
}
