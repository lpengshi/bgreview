import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, flatMap, toArray } from 'rxjs/operators';

import {
  Boardgames,
  Categories,
  Boardgame,
  BoardgameDetail,
  CommentList,
  Comment,
  PostComment,
  Snippet
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

  boardgameDetail(gameId: string): Promise<BoardgameDetail>{
    return (
      this.http.get<BoardgameDetail>(`/api/boardgame/${gameId}`)
      .toPromise()
      .then(result =>{ 
          const bg = <BoardgameDetail>{
            id: result['_id'],
            name: result['Name'],
            thumbnail: result.thumbnail,
            alternate: result.alternate,
            artist: result['boardgameartist'],
            category: result['category'],
            designer: result['boardgamedesigner'],
            family: result['boardgamefamily'],
            mechanic: result['boardgamemechanic'],
            publisher: result['boardgamepublisher'],
            description: result.description,
            image: result.image,
            maxplayers: result.maxplayers,
            playing_time: result['playingtime'],
            year_published: result['yearpublished'],
            rank: result['Rank'],
            average: result['Average'],
            bayes_average: result['Bayes average'],
            users_rated: result['Users rated']
          }
          return bg;
      })           
  )
  }

  getSnippet(boardgameId: string): Promise<Snippet>{
    return (
      this.http.get<Snippet>(`/api/boardgame/${boardgameId}`)
      .pipe(
        map(v => v['data'][0]),
        flatMap(v => v), 
        map((v: any) => {
          return(<Snippet>{
            id: v['_id'],
            name: v['Name'],
            thumbnail: v.thumbnail,
            alternate: v.alternate
          })
        })
      )
      .toPromise()                 
  )
  }
}
