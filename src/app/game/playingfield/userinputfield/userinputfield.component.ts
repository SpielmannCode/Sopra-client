import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Game} from '../../../shared/models/game';
import {MoveService} from '../../../shared/services/move.service';
import {DragulaService} from "ng2-dragula";
import {GameService} from "../../../shared/services/game.service";

@Component({
  selector: 'app-userinputfield',
  templateUrl: './userinputfield.component.html',
  styleUrls: ['./userinputfield.component.css']
})
export class UserinputfieldComponent implements OnInit, OnChanges, AfterViewInit {
  showCardStack: boolean = false;
  @Input('game') game: Game;
  @Input('dragulaService') dragulaService: DragulaService;
  @Input('timerPercentage') timerPercentage;
  @ViewChild('timer') timer;
  Playingstatus: string;
  currentPlayer;
  currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;
  protected currentRoundNumber: number = 1;

  constructor(private moveService: MoveService,
              private gameService: GameService) {

  }

  ngOnInit() {
    this.showStatus();
  }
  ngOnChanges(changes: SimpleChanges){
    this.currentRoundNumber=this.game.currentRound;

    if (typeof this.timer !== undefined) {
      this.timer.nativeElement.style.width = (100 - this.timerPercentage) + '%';
    }

    this.showStatus();
  }

  ngAfterViewInit() {

  }

  showStatus() {
    this.currentRoundNumber=this.game.currentRound;

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

    this.moveService.addMove(this.game, moveJson).subscribe(() => this.gameService.getGame(this.game.id));
  }

  toggleCardStack() {
    this.showCardStack = !this.showCardStack;
  }

}
