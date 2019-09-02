import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { Boardgames, Categories, Boardgame } from './model';

@Injectable()
export class BoardgameService {

  constructor(readonly http: HttpClient) { }

  boardgames(): Promise<Boardgames> {
    return (
      this.http.get<Boardgame[]>('/api/boardgames')
        .toPromise()
        .then(result => {
          return (<Boardgames>{
            boardgames: result,
            });
        })
    );
  }

  categories(): Promise<Categories> {
    return (
      this.http.get<string[]>('/api/categories')
        .toPromise()
        .then(result => {
          return (<Categories>{
            categories: result,
            });
        })
    );
  }

}