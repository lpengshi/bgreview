export interface Boardgame {
  _id: string;
  ID: string;
  Name: string;
}

export interface Boardgames {
  boardgames: Boardgame[];
}

export interface Categories {
  categories: string[];
}

export interface Comment {
  _id: string;
  ID: number;
  name: string;
  comment: string;
  user: string;
  rating: number;
}

export interface CommentList {
  comments: Comment[];
}

export class PostComment {
  constructor(
    public user: string,
    public comment: string,
    public rating: number,
    public name: string
  ) {}
}
