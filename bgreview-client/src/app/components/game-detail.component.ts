import { Component, OnInit, Input, Output } from "@angular/core";
import { BoardgameDetail, Boardgame } from "../model";
import { BoardgameService } from "../boardgame.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-game-detail",
  templateUrl: "./game-detail.component.html",
  styleUrls: ["./game-detail.component.css"]
})
export class GameDetailComponent implements OnInit {
  gameId = "";

  bgdetail: BoardgameDetail = {
    id: "",
    name: "",
    thumbnail: "",
    alternate: [],
    artist: [],
    category: [],
    designer: [],
    family: [],
    mechanic: [],
    publisher: [],
    description: "",
    image: "",
    maxplayers: "",
    playing_time: 0,
    year_published: 0,
    rank: 0,
    average: 0,
    bayes_average: 0,
    users_rated: 0
  };

  altNames = "";
  artists = "";
  categories = "";
  designers = "";
  families = "";
  mechanics = "";
  publishers = "";

  comments = "";

  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly boardgameSvc: BoardgameService,
    readonly route: Router
  ) {}

  ngOnInit() {
    this.gameId = this.activatedRoute.snapshot.params.gameId;
    this.comments = `/boardgame/${this.gameId}/comments`;

    this.boardgameSvc
      .boardgameDetail(this.gameId)
      .then(result => {
        console.info(">>> result: ", result);
        this.bgdetail = result;
        //this.filterArray();
        this.setArray();
      })
      .catch(error => {
        console.info(">>> error: ", error);
        this.bgdetail = null;
      });
  }

  setArray() {
    this.altNames = this.arrayRegex(this.bgdetail.alternate);
    this.artists = this.arrayRegex(this.bgdetail.artist);
    this.categories = this.arrayRegex(this.bgdetail.category);
    this.designers = this.arrayRegex(this.bgdetail.designer);
    this.families = this.arrayRegex(this.bgdetail.family);
    this.mechanics = this.arrayRegex(this.bgdetail.mechanic);
    this.publishers = this.arrayRegex(this.bgdetail.publisher);
  }

  arrayRegex(input: string[]): string {
    var res = "";
    if (input != null) {
      for (let i = 0; i < input.length; i++) {
        const element = input[i];
        res = res + element;
      }
      res = res.replace(/[[]|'|]/g, "");
      res = res.replace(/(Admin: Better Description Needed!)/g, "N.A");
    }
    return res.trim();
  }
}
