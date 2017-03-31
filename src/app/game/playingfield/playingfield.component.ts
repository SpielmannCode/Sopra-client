import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../shared/models/game";
import {DragulaService} from "ng2-dragula";
import {SiteComponent} from "./site/site.component";

@Component({
  selector: 'app-playingfield',
  templateUrl: './playingfield.component.html',
  styleUrls: ['./playingfield.component.css']
})
export class PlayingfieldComponent implements OnInit {

  @Input('game') game: Game;

  constructor(protected dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });

    let self = this;
    dragulaService.setOptions('first-bag',{
      moves: function(el, source, handle, sibling) {
        let userToken = JSON.parse(localStorage.getItem('currentUser')).token;
        // returns true if it is current players turn
        return self.game.players[self.game.currentPlayerIndex].token === userToken;
      }
    });

  }

  ngOnInit() {

  }

  protected onDrag(args) {
    let [e, el] = args;
    // do something
  }

  protected onDrop(args) {
    let [e, el] = args;
    let audio = new Audio();
    this.removeClass(el, 'drop-border');

    switch (e.tagName) {
      case 'APP-SHIP': {
        audio.src ='/assets/musik/fx/32304__acclivity__shipsbell.wav';
        SiteComponent.placeStonesOn(el.id);
        break;
      }
      case 'APP-STONE': {
        audio.src ='/assets/musik/fx/25847__freqman__concrete-blocks-moving3.wav';

        break;
      }
    }

    audio.load();
    audio.play();
  }

  protected onOver(args) {
    let [e, el, container] = args;
    this.addClass(el , 'drop-border');
  }

  protected onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'drop-border');
  }

  protected addClass(el: any, name: string) {
    el.className = el.className ? [el.className, name].join(' ') : name;
  }

  protected removeClass(el: any, name: string) {
    el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
  }
}
