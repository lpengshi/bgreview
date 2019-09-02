export interface Boardgame {
  _id: string;
  ID: string;
  Name: string;
}

export interface Boardgames {
  boardgames: Boardgame[];
}

export interface  Categories{
  categories: string[];
}