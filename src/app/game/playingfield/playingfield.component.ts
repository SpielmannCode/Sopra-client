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
import {CardstackComponent} from "../statsboard/cardstack/cardstack.component";

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
  private pressFCount: number = 0;
  private babaState: number = 0;
  private pressGCount: number = 0;
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
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
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
        return self.game.players[self.game.currentPlayerIndex].token === userToken;
      },
      accepts: function(el, target, source, sibling) {
        return (target.childElementCount < 2);
      }, revertOnSpill: true
    });

  }

  ngOnInit() {
    this.baba.src = '/assets/musik/Backmusic.mp3';
    this.baba.load();
    this.MLGCount = 0;
  }

  ngAfterViewInit() {
  }

  protected onDrag(args) {
    const [e, el] = args;
  }

  protected onDrop(args) {
    const [e, el] = args;
    const currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;
    const audio = new Audio();
    GameComponent.removeClass(el, 'drop-border');

    if (CardstackComponent.playCardMode) {
      return;
    }

    switch (e.tagName) {
      case 'APP-SHIP': {
        audio.src = '/assets/musik/fx/Small-waves-sound-effect.mp3';
        const shipIndex = (parseInt(e.id.match(/(\d+)/)[1]) - 1).toString();
        this.siteComponent.placeStonesOn(el, shipIndex);
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

  protected onOver(args) {
    const [e, el, container] = args;
    GameComponent.addClass(el , 'drop-border');
  }

  protected onOut(args) {
    const [e, el, container] = args;
    GameComponent.removeClass(el, 'drop-border');
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

  Flistener(event) {
    if (event.keyCode === 70) {
      this.pressFCount++;
      this.babaState = 0;
      this.pressGCount = 0;

      if (this.pressFCount === 2) {
        this.fastForwardModal.open();
        this.pressFCount = 0;
      }
    }
    if (event.keyCode !== 70 && event.keyCode !== 66 && event.keyCode !== 65 && event.keyCode !== 71){
      this.babaState = 0;
      this.pressFCount = 0;
      this.pressGCount = 0;
    }
    if (event.keyCode === 66 && this.babaState === 0){
      this.babaState = 1;
      this.pressFCount = 0;
      this.pressGCount = 0;
    }
    if (event.keyCode === 66 && this.babaState === 1){
      this.babaState = 1;
      this.pressFCount = 0;
      this.pressGCount = 0;
    }
    if (event.keyCode === 65 && this.babaState === 1){
      this.babaState = 2;
      this.pressFCount = 0;
      this.pressGCount = 0;
    }
    if (event.keyCode === 66 && this.babaState === 2){
      this.babaState = 3;
      this.pressFCount = 0;
      this.pressGCount = 0;
    }
    if (event.keyCode === 65 && this.babaState === 3){
      this.babaState = 0;
      this.startBABA();
      this.pressFCount = 0;
      this.pressGCount = 0;
    }
    if (event.keyCode === 71) {
      this.pressGCount++;
      this.babaState = 0;
      this.pressFCount = 0;

      if (this.pressGCount === 2) {
        this.MLGCount++;
        const audio = new Audio();
        audio.src = '/assets/musik/fx/MLGHornsSoundEffect.mp3';
        if(this.MLGCount === 3){
          audio.src = '/assets/musik/fx/Smokeweedeveryday.mp3';
        }
        audio.load();
        audio.play();
        this.MLGModal.open();
        this.pressGCount = 0;
        if(this.MLGCount > 3){
          this.MLGCount = 1;
        }
      }
    }
  }

  fastForward() {
    this.gameService.fastForward(this.game, this.roundNumber.nativeElement.value).subscribe(() => this.fastForwardModal.close());
  }

  setShipsDraggable(draggable: boolean) {
    this.dragulaService.setOptions('first-bag', {
      moves: function(el, source, handle, sibling) {
        return draggable;
      }
    });
  }

  setStonesDraggable(draggable: boolean) {
    this.dragulaService.setOptions('second-bag', {
      moves: function(el, source, handle, sibling) {
        return draggable;
      }
    });
  }

}
