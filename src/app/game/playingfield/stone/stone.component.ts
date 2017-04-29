import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../shared/models/game";

@Component({
  selector: 'app-stone',
  templateUrl: './stone.component.html',
  styleUrls: ['./stone.component.css']
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
