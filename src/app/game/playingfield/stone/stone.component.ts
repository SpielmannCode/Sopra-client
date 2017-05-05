import {animate, Component, Input, OnInit, state, style, transition, trigger} from '@angular/core';
import {Game} from "../../../shared/models/game";

@Component({
  selector: 'app-stone',
  templateUrl: './stone.component.html',
  styleUrls: ['./stone.component.css'],
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
export class StoneComponent implements OnInit {
  @Input('stoneColor') stoneColor;
  @Input('stoneMarker') stoneMarker;
  texturestyle: number ;



  constructor() { }

  ngOnInit() {
    this.texturestyle = this.getRandomInt(1,4)
  }
  getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
