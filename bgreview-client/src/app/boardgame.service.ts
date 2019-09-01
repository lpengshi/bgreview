import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { Boardgames, BoardgameName } from './model';

@Injectable()
export class BoardgameService {

  constructor(readonly http: HttpClient) { }

  boardgames(): Promise<Boardgames> {
    return (
      this.http.get<string[]>('/api/boardgames')
        .toPromise()
        .then(result => {
          return (<Boardgames>{
            boardgames: result,
            });
        })
    );
  }

}