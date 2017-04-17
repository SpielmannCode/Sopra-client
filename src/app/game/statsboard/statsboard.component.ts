import {animate, Component, Input, OnChanges, OnInit, state, style, transition, trigger} from '@angular/core';
import {Game} from '../../shared/models/game';

@Component({
  selector: 'app-statsboard',
  templateUrl: './statsboard.component.html',
  styleUrls: ['./statsboard.component.css'],
  animations: [
    trigger('statsBoardInit', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class StatsboardComponent implements OnInit, OnChanges {

  @Input('game') game: Game;

  constructor() {
  }

  ngOnInit() {
  }
  ngOnChanges(){
  }
  getCardcount(playertoken): number[] {
    let greenCardCount = 0 ;
    let blueCardCount = 0;
    let purpleCardCount = 0;
    let cardArray: number[] = [0, 0, 0];
    for (const player of this.game.players) {
      if (player.token === playertoken) {
        for (const card of player.cards){
          if (card === 'Burial_Chamber_Decoration' || card === 'Obelisk_Decoration' ||
            card === 'Pyramid_Decoration' || card === 'Temple_Decoration'){
            greenCardCount++;
          }
          else if (card === 'Chisel' || card === 'Hammer' || card === 'Lever' || card === 'Sail' ){
            blueCardCount++;
          }
          else if (card === 'Statue'){
            purpleCardCount++;
          }
        }
      }
    }
    cardArray[0] = greenCardCount;
    cardArray[1] = blueCardCount;
    cardArray[2] = purpleCardCount;
    return cardArray;
  }
}
