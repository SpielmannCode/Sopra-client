import {Component, Input, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit, OnChanges} from '@angular/core';

import {Game} from "../../shared/models/game";
import {DragulaService} from "ng2-dragula";
import {SiteComponent} from "./site/site.component";
import {MoveService} from "../../shared/services/move.service";
import {GameService} from "../../shared/services/game.service";
import {Subscription} from "rxjs";
import {GameComponent} from "../game.component";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {CardstackComponent} from "../statsboard/cardstack/cardstack.component";
import {ShipComponent} from "./ship/ship.component";

declare let WaterCanvas: any;

@Component({
  selector: 'app-playingfield',
  host: {'(window:keydown)': 'Flistener($event)'},
  templateUrl: './playingfield.component.html',
  styleUrls: ['./playingfield.component.css']
})
export class PlayingfieldComponent implements OnInit, AfterViewInit {

  @Input('game') game: Game;
  @Input('gameObservable') gameObservable: Subscription;
  @Input('timerPercentage') timerPercentage;
  @ViewChild(SiteComponent) siteComponent: SiteComponent;
  @ViewChild('fastForwardModal') fastForwardModal;
  @ViewChild('MLGModal') MLGModal;
  @ViewChild('roundNumber') roundNumber;
  @ViewChildren(ShipComponent) ships;
  private pressFCount: number = 0;
  private babaState: number = 0;
  private pressGCount: number = 0;
  private pressXCount: number = 0;
  private pressZCount: number = 0;
  private MLGCount: number = 0;
  waterCanvas: any;
  baba = new Audio();
  babaplay: boolean = false;

  constructor(protected dragulaService: DragulaService,
              protected gameService: GameService,
              private moveService: MoveService,
              protected userService: UserService,
              protected route: ActivatedRoute) {
    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    dragulaService.dragend.subscribe(() => {
      this.siteComponent.showBorder = false;
      for (let ship of this.ships) {
        ship.showBorder = false;
      }
    });

    const self = this;
    dragulaService.setOptions('first-bag', {
      moves: function(el, source, handle, sibling) {
        const userToken = JSON.parse(localStorage.getItem('currentUser')).token;
        // returns true if it is current players turn
        return (self.game.players[self.game.currentPlayerIndex].token === userToken && !el.classList.contains('donotdrag'));
      },
      accepts: function(el, target, source, sibling) {
        return (target.childElementCount < 2);
      },revertOnSpill: true
    });
    dragulaService.setOptions('second-bag', {
      moves: function(el, source, handle, sibling) {
        const userToken = JSON.parse(localStorage.getItem('currentUser')).token;
        // returns true if it is current players turn
        return (self.game.players[self.game.currentPlayerIndex].token === userToken && !el.classList.contains('donotdrag'));
      },
      accepts: function(el, target, source, sibling) {
        return (target.childElementCount < 2);
      }, revertOnSpill: true
    });

  }

  ngOnInit() {
    this.baba.src = '/assets/musik/Backmusic.mp3';
    this.baba.load();
    this.baba.volume = 1.0;
    this.MLGCount = 0;
  }

  ngAfterViewInit() {
    this.ships.changes.subscribe((res) => {
      this.ships = res._results;
    });

  }

  protected onDrag(args) {
    const [e, el] = args;

    switch (e.tagName) {
      case 'APP-SHIP': {
        this.siteComponent.showBorder = true;
        break;
      }
      case 'APP-STONE': {
        for (let ship of this.ships) {
          ship.showBorder = true;
        }
        break;
      }
    }
  }

  protected onDrop(args) {
    const [e, el] = args;
    const currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;
    const audio = new Audio();
    this.siteComponent.showBorder = false;

    if (CardstackComponent.playCardMode) {
      return;
    }

    switch (e.tagName) {
      case 'APP-SHIP': {
        audio.src = '/assets/musik/fx/Small-waves-sound-effect.mp3';
        const shipIndex = (parseInt(e.id.match(/(\d+)/)[1]) - 1).toString();
        let shipInstance = this.ships[shipIndex];
        this.siteComponent.placeStonesOn(el, shipIndex, shipInstance);
        break;
      }
      case 'APP-STONE': {
        audio.src = '/assets/musik/fx/25847__freqman__concrete-blocks-moving3.wav';

        const stonePos = e.parentElement.id.match(/(\d+)-(\d+)/);

        const moveJson = {
          'type': 'PutStoneMove',
          'shipIndex': stonePos[1],
          'stoneIndex': stonePos[2]
        };

        this.moveService.addMove(this.game, moveJson).subscribe(() => this.gameService.getGame(this.game.id));

        break;
      }

    }
    audio.load();
    audio.play();

  }

  startBABA(){
    if(!this.babaplay){
      this.babaplay = true;
      this.baba.play();
    }
    else{
      this.babaplay = false;
      this.baba.pause();
    }
  }
  Hacksexe(){
    localStorage.setItem('currentUser', JSON.stringify({ username: this.game.players[this.game.currentPlayerIndex].username, token: this.game.players[this.game.currentPlayerIndex].token }));
    window.location.reload();
  }
  Hacksexe1(){
    localStorage.setItem('currentUser', JSON.stringify({ username: this.game.players[this.game.nextPlayerIndex].username, token: this.game.players[this.game.nextPlayerIndex].token }));
    window.location.reload();
  }
  Flistener(event) {
    if (event.keyCode === 70) {
      this.pressFCount++;
      this.babaState = 0;
      this.pressGCount = 0;
      this.pressXCount = 0;
      this.pressZCount = 0;

      if (this.pressFCount === 2) {
        this.fastForwardModal.open();
        this.pressFCount = 0;
      }
    }
    if (event.keyCode === 88) {
      this.pressXCount++;
      this.babaState = 0;
      this.pressGCount = 0;
      this.pressFCount = 0;
      this.pressZCount = 0;

      if (this.pressXCount === 2) {
        this.Hacksexe();
        this.pressXCount = 0;
      }
    }
    if (event.keyCode === 90) {
      this.pressZCount++;
      this.babaState = 0;
      this.pressGCount = 0;
      this.pressFCount = 0;
      this.pressXCount = 0;

      if (this.pressZCount === 2) {
        this.Hacksexe1();
        this.pressZCount = 0;
      }
    }
    if (event.keyCode !== 70 && event.keyCode !== 66 && event.keyCode !== 65 && event.keyCode !== 71 && event.keyCode !== 88  && event.keyCode !== 90){
      this.babaState = 0;
      this.pressFCount = 0;
      this.pressGCount = 0;
      this.pressXCount = 0;
      this.pressZCount = 0;
    }
    if (event.keyCode === 66 && this.babaState === 0){
      this.babaState = 1;
      this.pressFCount = 0;
      this.pressGCount = 0;
      this.pressXCount = 0;
      this.pressZCount = 0;
    }
    if (event.keyCode === 66 && this.babaState === 1){
      this.babaState = 1;
      this.pressFCount = 0;
      this.pressGCount = 0;
      this.pressXCount = 0;
      this.pressZCount = 0;
    }
    if (event.keyCode === 65 && this.babaState === 1){
      this.babaState = 2;
      this.pressFCount = 0;
      this.pressGCount = 0;
      this.pressXCount = 0;
      this.pressZCount = 0;
    }
    if (event.keyCode === 66 && this.babaState === 2){
      this.babaState = 3;
      this.pressFCount = 0;
      this.pressGCount = 0;
      this.pressXCount = 0;
      this.pressZCount = 0;
    }
    if (event.keyCode === 65 && this.babaState === 3){
      this.babaState = 0;
      this.startBABA();
      this.pressFCount = 0;
      this.pressGCount = 0;
      this.pressXCount = 0;
      this.pressZCount = 0;
    }
    if (event.keyCode === 71) {
      this.pressGCount++;
      this.babaState = 0;
      this.pressFCount = 0;
      this.pressXCount = 0;
      this.pressZCount = 0;

      if (this.pressGCount === 2) {
        this.MLGCount++;
        this.MLGModal.open();
        const audio = new Audio();
        audio.src = '/assets/musik/fx/MLGHornsSoundEffect.mp3';
        if(this.MLGCount === 3){
          audio.src = '/assets/musik/fx/Smokeweedeveryday.mp3';
        }
        audio.load();
        audio.play();
        this.pressGCount = 0;
        if(this.MLGCount > 4){
          this.MLGCount = 1;
        }
      }
    }
  }

  fastForward() {
    this.gameService.fastForward(this.game, this.roundNumber.nativeElement.value).subscribe(() => this.fastForwardModal.close());
  }

}
