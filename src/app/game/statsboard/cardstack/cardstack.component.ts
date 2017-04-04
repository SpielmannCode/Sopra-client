import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Game} from "../../../shared/models/game";

@Component({
  selector: 'app-cardstack',
  templateUrl: './cardstack.component.html',
  styleUrls: ['./cardstack.component.css']
})
export class CardstackComponent implements OnInit, OnChanges {
  @Input('game') game: Game;
  playerCards;

  constructor() { }

  ngOnInit() {
    this.setPlayerCards();
  }

  ngOnChanges() {
    this.setPlayerCards();
  }

  setPlayerCards() {
    let userToken = JSON.parse(localStorage.getItem('currentUser')).token;
    for (let player of this.game.players) {
      if (player.token === userToken) {
        this.playerCards = player.cards;
      }
    }
  }

}
