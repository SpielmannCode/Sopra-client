import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../shared/models/game";

@Component({
  selector: 'app-stone',
  templateUrl: './stone.component.html',
  styleUrls: ['./stone.component.css']
})
export class StoneComponent implements OnInit {
  @Input('stoneColor') stoneColor;

  constructor() { }

  ngOnInit() {
  }

}
