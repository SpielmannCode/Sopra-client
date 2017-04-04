
import {Component, Input, OnInit} from '@angular/core';
import {MoveService} from "../../../../shared/services/move.service";
import {Game} from "../../../../shared/models/game";


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent implements OnInit {
  @Input('game') game: Game;
  @Input('marketSite') marketSite;
  @Input('logicState') logicState;

  constructor(private moveService: MoveService) { }

  ngOnInit() {
  }

  takeCard(cardIndex:number) {
    let moveJson = {
      "type": "TakeCardMove",
      "cardIndex": cardIndex
    };

    this.moveService.addMove(this.game, moveJson).subscribe(() => console.log('take card executed!'));
  }
}
