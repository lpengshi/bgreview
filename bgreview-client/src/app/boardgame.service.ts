import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {
  Boardgames,
  Categories,
  Boardgame,
  CommentList,
  Comment,
  PostComment
} from "./model";

@Injectable()
export class BoardgameService {
  constructor(readonly http: HttpClient) {}

  boardgames(): Promise<Boardgames> {
    return this.http
      .get<Boardgame[]>("/api/boardgames")
      .toPromise()
      .then(result => {
        return <Boardgames>{
          boardgames: result
        };
      });
  }

  categories(): Promise<Categories> {
    return this.http
      .get<string[]>("/api/categories")
      .toPromise()
      .then(result => {
        return <Categories>{
          categories: result
        };
      });
  }

  comments(gameId): Promise<CommentList> {
    return this.http
      .get<Comment[]>(`/api/boardgame/${gameId}/comments`)
      .toPromise()
      .then(result => {
        console.info(">>> result: ", result);
        return <CommentList>{
          comments: result
        };
      });
  }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  addComment(gameId, comment: PostComment) {
    console.info(">>> add comment: ", comment);
    return this.http
      .post<PostComment>(
        `/api/boardgame/${gameId}/comments`,
        JSON.stringify(comment),
        this.httpOptions
      )
      .toPromise()
      .then(result => {
        console.info(">>> result: ", result);
      });
  }
}
