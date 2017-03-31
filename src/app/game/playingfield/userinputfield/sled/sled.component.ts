import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../../shared/models/game";

@Component({
  selector: 'app-sled',
  templateUrl: './sled.component.html',
  styleUrls: ['./sled.component.css']
})
export class SledComponent implements OnInit {
  @Input('game') game: Game;
  stoneColor: string;
  currentPlayer;

  constructor() { }

  ngOnInit() {

    // Determine the stone color of current player
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;
    for (let player of this.game.players) {
      if (player.token === currentUserToken) {
        this.currentPlayer = player;
        this.stoneColor = player.stoneColor;

      }
    }
  }

}
