import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import {
  BoardgameList,
  CategoryList,
  Boardgame,
  BoardgameDetail,
  CommentList,
  Comment,
  PostComment
} from "./model";

@Injectable()
export class BoardgameService {
  constructor(readonly http: HttpClient) {}

  boardgames(name: string): Promise<BoardgameList> {
    const params = new HttpParams().set("name", name);
    return this.http
      .get<Boardgame[]>("/api/boardgames", { params: params })
      .toPromise()
      .then(result => {
        return <BoardgameList>{
          boardgames: result
        };
      });
  }

  category(category: string): Promise<BoardgameList> {
    return this.http
      .get<Boardgame[]>(`/api/boardgames/${category}`)
      .toPromise()
      .then(result => {
        return <BoardgameList>{
          boardgames: result
        };
      });
  }

  categories(): Promise<CategoryList> {
    return this.http
      .get<string[]>("/api/categories")
      .toPromise()
      .then(result => {
        return <CategoryList>{
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

  boardgameDetail(gameId: number): Promise<BoardgameDetail> {
    return this.http
      .get<BoardgameDetail>(`/api/boardgame/${gameId}`)
      .toPromise()
      .then(result => {
        const bg = <BoardgameDetail>{
          id: result[0]["_id"],
          name: result[0]["Name"],
          thumbnail: result[0].thumbnail,
          alternate: result[0].alternate,
          artist: result[0]["boardgameartist"],
          category: result[0]["category"],
          designer: result[0]["boardgamedesigner"],
          family: result[0]["boardgamefamily"],
          mechanic: result[0]["boardgamemechanic"],
          publisher: result[0]["boardgamepublisher"],
          description: result[0].description,
          image: result[0].image,
          maxplayers: result[0].maxplayers,
          playing_time: result[0]["playingtime"],
          year_published: result[0]["yearpublished"],
          rank: result[0]["Rank"],
          average: result[0]["Average"],
          bayes_average: result[0]["Bayes average"],
          users_rated: result[0]["Users rated"]
        };
        return bg;
      });
  }
}
