import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../shared/models/game";

@Component({
  selector: 'app-statsboard',
  templateUrl: './statsboard.component.html',
  styleUrls: ['./statsboard.component.css']
})
export class StatsboardComponent implements OnInit {

  @Input('game') game: Game;

  constructor() {
  }

  ngOnInit() {

  }

}
