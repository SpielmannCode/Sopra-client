import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../../shared/models/game';

@Component({
  selector: 'app-userinputfield',
  templateUrl: './userinputfield.component.html',
  styleUrls: ['./userinputfield.component.css']
})
export class UserinputfieldComponent implements OnInit {
  showCardStack: boolean = false;
  @Input('game') game: Game;
  Playingstatus: string;
  currentPlayer;

  constructor() {
  }

  ngOnInit() {
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;
    for (let player of this.game.players) {
      if (player.token === currentUserToken) {
        this.currentPlayer = player;
        if(this.game.players[this.game.currentPlayerIndex].token === this.currentPlayer.token) {
          this.Playingstatus = 'It is Your Turn!';
          }
          if(this.game.players[this.game.nextPlayerIndex].token === this.currentPlayer.token){
            this.Playingstatus = 'You are next, prepare!';
          }
          else{
            this.Playingstatus = ( this.game.players[this.game.currentPlayerIndex].username + 'Is currently playing');
          }
      }
    }
  }
  getStones(){

  }
  toggleCardStack() {
    this.showCardStack = !this.showCardStack;
  }
}
