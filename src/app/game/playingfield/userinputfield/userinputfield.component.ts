import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../shared/models/game";

@Component({
  selector: 'app-userinputfield',
  templateUrl: './userinputfield.component.html',
  styleUrls: ['./userinputfield.component.css']
})
export class UserinputfieldComponent implements OnInit {
  showCardStack: boolean = false;
  @Input('game') game: Game;

  constructor() {
  }

  ngOnInit() {
  }

  toggleCardStack() {
    this.showCardStack = !this.showCardStack;
  }
}
