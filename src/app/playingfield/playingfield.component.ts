import { Component, OnInit } from '@angular/core';
import {GameService} from "../shared/services/game.service";
import {ActivatedRoute} from "@angular/router";
import {Game} from "../shared/models/game";

@Component({
  selector: 'app-playingfield',
  templateUrl: './playingfield.component.html',
  styleUrls: ['./playingfield.component.css']
})
export class PlayingfieldComponent implements OnInit {
  gameId: number;
  game: Game;

  constructor(private gameService: GameService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      console.log(this.gameId);

      this.gameService.getGame(this.gameId).subscribe(game => {
        this.game = game;
        console.log(game);
      });
    });


  }

}
