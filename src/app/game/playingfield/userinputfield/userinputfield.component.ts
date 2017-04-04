import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Game} from '../../../shared/models/game';
import {MoveService} from '../../../shared/services/move.service';

@Component({
  selector: 'app-userinputfield',
  templateUrl: './userinputfield.component.html',
  styleUrls: ['./userinputfield.component.css']
})
export class UserinputfieldComponent implements OnInit, OnChanges {
  showCardStack: boolean = false;
  @Input('game') game: Game;
  Playingstatus: string;
  currentPlayer;
  private _opened: boolean = true;
  constructor(private moveService: MoveService) {

  }

  ngOnInit() {
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;
    for (let player of this.game.players) {
      if (player.token === currentUserToken) {
        this.currentPlayer = player;
        if(this.game.players[this.game.currentPlayerIndex].token === this.currentPlayer.token) {
          this.Playingstatus = 'It is Your Turn!';
          }
          else if(this.game.players[this.game.nextPlayerIndex].token === this.currentPlayer.token){
            this.Playingstatus = 'You are next, prepare!';
          }
          else{
            this.Playingstatus = ( this.game.players[this.game.currentPlayerIndex].username + 'Is currently playing');
          }
      }
    }
  }
  ngOnChanges(changes: SimpleChanges){
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;
    for (let player of this.game.players) {
      if (player.token === currentUserToken) {
        this.currentPlayer = player;
        if(this.game.players[this.game.currentPlayerIndex].token === this.currentPlayer.token) {
          this.Playingstatus = 'It is Your Turn!';
        }
        else if(this.game.players[this.game.nextPlayerIndex].token === this.currentPlayer.token){
          this.Playingstatus = 'You are next, prepare!';
        }
        else{
          this.Playingstatus = ( this.game.players[this.game.currentPlayerIndex].username + 'Is currently playing');
        }
      }
    }
  }

  getStones(){
    let moveJson = {
      "type": "TakeStoneMove"
    };

    this.moveService.addMove(this.game,moveJson).subscribe();
  }

  toggleCardStack() {
    this.showCardStack = !this.showCardStack;
  }
  private toggleSidebar() {
    this._opened = !this._opened;
  }
}
