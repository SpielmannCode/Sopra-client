import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Game} from '../../../../shared/models/game';

@Component({
  selector: 'app-sled',
  templateUrl: './sled.component.html',
  styleUrls: ['./sled.component.css']
})
export class SledComponent implements OnInit , OnChanges {
  @Input('game') game: Game;
  stoneColor: string;
  stones;
  currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;

  constructor() { }

  ngOnInit() {
    for (let player of this.game.players) {
      if (player.token === this.currentUserToken) {
        this.stoneColor = player.stoneColor;
        this.stones = Array(player.stoneSupply).fill(3);
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let player of this.game.players) {
      if (player.token === this.currentUserToken) {
        this.stoneColor = player.stoneColor;
        this.stones = Array(player.stoneSupply).fill(3);
      }
    }
  }
}
