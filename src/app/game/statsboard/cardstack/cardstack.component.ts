import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Game} from "../../../shared/models/game";
import {CardComponent} from "./card/card.component";
import {MoveService} from "../../../shared/services/move.service";
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'app-cardstack',
  templateUrl: './cardstack.component.html',
  styleUrls: ['./cardstack.component.css']
})
export class CardstackComponent implements OnInit, OnChanges {
  @Input('game') game: Game;

  userToken: String = JSON.parse(localStorage.getItem('currentUser')).token;
  playerCards;
  cardColors: string[] = [];

  @ViewChild('setMoveModal') setMoveModal;
  static playCardMode: boolean = false;
  modalCardDescription: string;
  modalSelectedCard: string;

  dropCount: number = 0;
  stone1Index: number;
  ship1Index: number;
  stone2Index: number;
  ship2Index: number;

  shipIndex: number;
  stoneIndex: number;

  constructor(private moveService: MoveService,
              private dragulaService: DragulaService) {

}

  ngOnInit() {
    this.setPlayerCards();
  }

  ngOnChanges() {
    this.setPlayerCards();
  }

  setPlayerCards() {
    let i = 0;
    for (let player of this.game.players) {
      if (player.token === this.userToken) {
        this.playerCards = player.cards;

        while (i  < player.cards.length) {
          this.cardColors[i] = CardComponent.getCardColor(player.cards[i]);
          i++;
        }
      }
    }
  }

  openMoveModal(card) {
    this.modalSelectedCard = card;
    console.log(this.modalSelectedCard);
    this.setMoveModal.open();
  }

  showCardModal() {
    let moveType = 'Play' + this.modalSelectedCard + 'Move';
    console.log(this.modalSelectedCard);

    switch (moveType) {
      case 'PlayChiselMove': {
        this.modalCardDescription = 'Place 2 stones on 1 ship OR place 1 stone on each of 2 ships';

        break;
      }
      case 'PlayHammerMove': {
        break;
      }
      case 'PlayLeverMove': {
        break;
      }
      case 'PlaySailMove': {
        break;
      }
    }



    console.log(moveType);

    let moveJson = {
      "type": "P"
    };


    // return this.moveService.addMove(this.game, )
  }

  setPlayCardMode(card) {
    CardstackComponent.playCardMode = true;
    console.log('play card mode');

    let moveType = 'Play' + card + 'Move';

    switch (moveType) {
      case 'PlayChiselMove': {

        this.dragulaService.drop.subscribe((value) => {
          this.chiselDrop(value.slice(1));
        });

        break;
      }
      case 'PlayHammerMove': {
        break;
      }
      case 'PlayLeverMove': {
        break;
      }
      case 'PlaySailMove': {
        console.log('PlaySailMove');

        this.dragulaService.drop.subscribe((value) => {
          this.sailDrop(value.slice(1));
        });
        break;
      }
    }
  }

  playCard(card) {


  }

  isPlayerTurn() {
    return this.game.players[this.game.currentPlayerIndex].token === this.userToken;
  }

  protected chiselDrop(args) {
    let [e, el] = args;
    let stonePos = e.parentElement.id.match(/(\d+)-(\d+)/);
    console.log(el);
    console.log('stone pos', stonePos[1], stonePos[2]);

    if (this.dropCount === 0) {
      this.ship1Index = parseInt(stonePos[1]);
      this.stone1Index = parseInt(stonePos[2]);
      this.dropCount++;
    } else {
      this.ship2Index = parseInt(stonePos[1]);
      this.stone2Index = parseInt(stonePos[2]);
      this.dropCount = 0;

      console.log(this.ship1Index, this.stone1Index, this.ship2Index, this.stone2Index);
      let moveJson = {
        "type": "PlayChiselMove",
        "stone1Index": this.stone1Index,
        "ship1Index": this.ship1Index,
        "ship2Index": this.ship2Index,
        "stone2Index": this.stone2Index
      };

      CardstackComponent.playCardMode = false;

      this.moveService.addMove(this.game, moveJson).subscribe(() => console.log('chisel drop'));
    }



  }

  protected sailDrop(args) {
    let [e, el] = args;
    console.log('sail drop');
    console.log(e.tagName);

    switch (e.tagName) {
      case 'APP-STONE': {
        let stonePos = e.parentElement.id.match(/(\d+)-(\d+)/);
        this.shipIndex = stonePos[1];
        this.stoneIndex = stonePos[2];
        break;
      }
      case 'APP-SHIP': {
        let shipIndex = (parseInt(e.id.match(/(\d+)/)[1]) - 1).toString();
        let site = el.id;
        console.log(el.id);

        let moveJson = {
          "type": "PlaySailMove",
          "shipIndex": this.shipIndex,
          "stoneIndex": this.stoneIndex,
          "site": ""
        };

        switch(el.id) {
          case 'MarketDock': {
            moveJson.site = 'Market Site';
            break;
          }
          case 'PyramidDock': {
            moveJson.site = 'Pyramid Site';
            break;
          }
          case 'TempleDock': {
            moveJson.site = 'Temple Site';
            break;
          }
          case 'BurialDock': {
            moveJson.site = 'Burial Chamber Site';
            break;
          }
          case 'ObeliskDock': {
            moveJson.site = 'Obelisk Site';
            break;
          }
        }

        this.moveService.addMove(this.game, moveJson).subscribe(() => console.log('sailed with card'));

      }
    }

  }

}
