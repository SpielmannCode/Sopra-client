import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../shared/models/game";

@Component({
  selector: 'app-playingfield',
  templateUrl: './playingfield.component.html',
  styleUrls: ['./playingfield.component.css']
})
export class PlayingfieldComponent implements OnInit {

  @Input('game') game: Game;

  constructor() {
  }

  ngOnInit() {
  }
}
