import { Component, OnInit } from "@angular/core";
import { BoardgameService } from "../boardgame.service";
import { CategoryList } from "../model";
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  categoryList: CategoryList = { categories: [] };
  searchInput: string;

  // MatPaginator Input
  length = this.categoryList.categories.length;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];
    
  // MatPaginator Output
  pageEvent: PageEvent;
  activeCategoryPage = [];

  constructor(
    readonly boardgameSvc: BoardgameService,
    readonly router: Router
  ) {}

  ngOnInit() {
    this.boardgameSvc
      .categories()
      .then(result => {
        this.categoryList = result;
        this.categoryList.categories.splice(0,1);
        this.activeCategoryPage = this.categoryList.categories.slice(0,
          this.pageSize
        );
      })
      .catch(error => {
        console.error(">> error: ", error);
      });
  }

  selected(text) {
    console.info("selected category: ", text);
    this.router.navigate(["/boardgames", text]);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activeCategoryPage = this.categoryList.categories.slice(
      firstCut,
      secondCut
    );
    window.scrollTo(0, 0);
  }
  onSubmit() {
    if (this.searchInput == undefined) {
      this.searchInput = "";
    }
    console.info("Search Input: ", this.searchInput);
    this.router.navigate(["/boardgames"], {
      queryParams: { name: this.searchInput }
    });
  }
}
