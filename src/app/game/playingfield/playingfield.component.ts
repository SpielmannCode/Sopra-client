import {Component, Input, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit} from '@angular/core';
import {Game} from "../../shared/models/game";
import {DragulaService} from "ng2-dragula";
import {SiteComponent} from "./site/site.component";
import {MoveService} from "../../shared/services/move.service";
import {GameService} from "../../shared/services/game.service";
import {Subscription} from "rxjs";
import {GameComponent} from "../game.component";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-playingfield',
  templateUrl: './playingfield.component.html',
  styleUrls: ['./playingfield.component.css']
})
export class PlayingfieldComponent extends GameComponent implements OnInit {

  @Input('game') game: Game;
  @Input('gameObservable') gameObservable: Subscription;
  @ViewChild(SiteComponent) siteComponent: SiteComponent;

  constructor(protected dragulaService: DragulaService,
              protected gameService: GameService,
              private moveService: MoveService,
              protected userService: UserService,
              protected route: ActivatedRoute) {
    super(userService, gameService, route);
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
    dragulaService.setOptions('second-bag',{
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
  }

  protected onDrop(args) {
    let [e, el] = args;
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;
    let audio = new Audio();
    this.removeClass(el, 'drop-border');

    switch (e.tagName) {
      case 'APP-SHIP': {
        audio.src ='/assets/musik/fx/32304__acclivity__shipsbell.wav';
        let shipIndex = (parseInt(e.id.match(/(\d+)/)[1]) - 1).toString();
        this.siteComponent.placeStonesOn(el, shipIndex);
        break;
      }
      case 'APP-STONE': {
        audio.src ='/assets/musik/fx/25847__freqman__concrete-blocks-moving3.wav';

        let stonePos = e.parentElement.id.match(/(\d+)-(\d+)/);

        let moveJson = {
          "type": "PutStoneMove",
          "shipIndex": stonePos[1],
          "stoneIndex": stonePos[2]
        };

        this.moveService.addMove(this.game, moveJson).subscribe(() => console.log('ok'));

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
