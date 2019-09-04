import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PageEvent } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";

import { CommentList, PostComment } from "../model";
import { BoardgameService } from "../boardgame.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  gameId = "";
  commentList: CommentList = { comments: [] };
  back = "";

  // MatPaginator Input
  length = this.commentList.comments.length;
  pageIndex: number = 0;
  pageSize: number = 20;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  // MatPaginator Output
  pageEvent: PageEvent;
  activePageComments = [];

  // form
  comment: PostComment;
  commentForm = new FormGroup({
    user: new FormControl(""),
    comment: new FormControl(""),
    rating: new FormControl(""),
    name: new FormControl("")
  });

  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly boardgameSvc: BoardgameService,
    readonly route: Router
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    this.gameId = this.activatedRoute.snapshot.params.gameId;
    console.info(">>> gameId: ", this.gameId);
    this.boardgameSvc
      .comments(this.gameId)
      .then(result => {
        console.info(">>> comment list: ", result);
        this.commentList = result;
        this.activePageComments = this.commentList.comments.slice(
          0,
          this.pageSize
        );
        this.back = `/boardgames?gameId=${this.gameId}`;
      })
      .catch(error => {
        console.info(">>> error: ", error);
      });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageComments = this.commentList.comments.slice(
      firstCut,
      secondCut
    );
  }

  onSubmit() {
    const user = this.commentForm.value.user;
    const comment = this.commentForm.value.comment;
    const rating = parseInt(this.commentForm.value.rating);
    const name = this.commentForm.value.name;
    console.info(user + comment + rating + name);

    this.comment = new PostComment(user, comment, rating, name);
    console.info(">>> comment: ", this.comment);

    this.boardgameSvc
      .addComment(this.gameId, this.comment)
      .then(result => {
        console.info(">>> result: ", result);
        this.commentForm.reset();
        this.route.navigate([`/boardgame/${this.gameId}/comments`]);
      })
      .catch(error => {
        console.info("error: ", error);
      });
  }
}
