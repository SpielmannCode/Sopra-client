import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Game} from '../../../shared/models/game';
import {MoveService} from '../../../shared/services/move.service';
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'app-userinputfield',
  templateUrl: './userinputfield.component.html',
  styleUrls: ['./userinputfield.component.css']
})
export class UserinputfieldComponent implements OnInit, OnChanges {
  showCardStack: boolean = false;
  @Input('game') game: Game;
  @Input('dragulaService') dragulaService: DragulaService;
  Playingstatus: string;
  currentPlayer;
  protected currentRoundNumber: number = 10;
  private _opened: boolean = false;
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
            this.Playingstatus = ( this.game.players[this.game.currentPlayerIndex].username + ' ' + 'is currently playing');
          }
      }
    }
  }
  ngOnChanges(changes: SimpleChanges){
    this.currentRoundNumber=this.game.currentRound ;


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
          this.Playingstatus = ( this.game.players[this.game.currentPlayerIndex].username + ' '+ 'is currently playing');
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
