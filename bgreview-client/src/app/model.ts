export interface Boardgame {
  _id: string;
  ID: string;
  Name: string;
}

export interface BoardgameList {
  boardgames: Boardgame[];
}

export interface CategoryList {
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
  ) { }
}

export interface BoardgameDetail {
  id: string;
  name: string;
  thumbnail: string;
  alternate: string[];
  artist: string[];
  category: string[];
  designer: string[];
  family: string[];
  mechanic: string[];
  publisher: string[];
  description: string;
  image: string;
  maxplayers: string;
  playing_time: number;
  year_published: number;
  rank: number;
  average: number;
  bayes_average: number;
  users_rated: number;
}
