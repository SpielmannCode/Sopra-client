import {
  animate, Component, Input, OnChanges, OnInit, SimpleChanges, state, style, transition,
  trigger
} from '@angular/core';
import {Game} from '../../../../shared/models/game';

@Component({
  selector: 'app-sled',
  templateUrl: './sled.component.html',
  styleUrls: ['./sled.component.css'],
  animations: [
    trigger('stoneEnter', [
      state('in', style({opacity: '1', transform: 'scale(1)'})),
      transition('void => *', [
        style({opacity: '0', transform: 'scale(0.5)'}),
        animate(500)
      ])
    ])
  ]
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
        this.stones = Array(player.stoneSupply).fill(player.stoneSupply);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let player of this.game.players) {
      if (player.token === this.currentUserToken) {
        this.stoneColor = player.stoneColor;
        this.stones = Array(player.stoneSupply).fill(player.stoneSupply);
      }
    }
  }


}
