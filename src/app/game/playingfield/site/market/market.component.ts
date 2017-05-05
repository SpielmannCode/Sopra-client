
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MoveService} from "../../../../shared/services/move.service";
import {Game} from "../../../../shared/models/game";
import {GameService} from "../../../../shared/services/game.service";


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent implements OnInit {
  @Input('game') game: Game;
  @Input('marketSite') marketSite;
  @Input('logicState') logicState;
  @Input('dockOpen') dockOpen;
  @Input('showBorder') showBorder;
  display = false;

  constructor(private moveService: MoveService,
              private gameService: GameService) { }
  enter(){
    this.display = true;
  }
  leave(){
    this.display = false;
  }
  ngOnInit() {
    this.display = false;
  }

  takeCard(cardIndex:number) {
    let moveJson = {
      "type": "TakeCardMove",
      "cardIndex": cardIndex
    };

    this.moveService.addMove(this.game, moveJson).subscribe(() => this.gameService.getGame(this.game.id));
  }
}
