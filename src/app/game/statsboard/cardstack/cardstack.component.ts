import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Game} from "../../../shared/models/game";
import {CardComponent} from "./card/card.component";
import {MoveService} from "../../../shared/services/move.service";
import {DragulaService} from "ng2-dragula";
import {SiteComponent} from "../../playingfield/site/site.component";
import {GameComponent} from "../../game.component";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
import * as testing from "selenium-webdriver/testing";

@Component({
  selector: 'app-cardstack',
  templateUrl: './cardstack.component.html',
  styleUrls: ['./cardstack.component.css'],
  providers: [MoveService]
})
export class CardstackComponent implements OnInit, OnChanges {
  @Input('game') game: Game;
  @Input('dragulaService') dragulaService: DragulaService;
  @Input('stonesToReorder') stonesToReorder;
  @Input('userToken') userToken: String = JSON.parse(localStorage.getItem('currentUser')).token;

  currentPlayer;
  playerCards;
  cardColors: string[] = [];

  @ViewChild('setMoveModal') setMoveModal;
  @ViewChild('stoneReorderModal') stoneReorderModal;
  @ViewChild('HammerModal') HammerModal;

  static playCardMode: boolean = false;
  modalCardDescription: string;
  modalSelectedCard: string = 'Chisel';

  site: string;

  dropCount: number = 0;
  stone1Index: number;
  ship1Index: number;
  stone2Index: number;
  ship2Index: number;

  shipIndex: number;
  stoneIndex: number;

  reordering: number[] = [];
  reordered: number[] = [];
  stoneColorsIndexed = {};

  constructor(private moveService: MoveService,
              private toastyService: ToastyService) {
  }

  ngOnInit() {
    this.setPlayerCards();
    this.setCardCount();
  }

  ngOnChanges() {
    this.setPlayerCards();
    this.setCardCount();

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
        this.currentPlayer = player;
      }
    }
  }
  setCardCount() {
    let i = 0;
    for (let player of this.game.players) {
      if (player.token === this.userToken) {
        this.playerCards = player.cards;
        while (i  < player.cards.length) {
          i++;
        }
        this.currentPlayer = player;
      }
    }
  }
  getCardcount(): number{
    let i = 0;
    for (let card of this.currentPlayer.cards){
      i++;
    }
    return i;
  }
  getBlankspaces(): number{
    let count = 0;
    for(let ships of this.game.gameBoard.availableShips){
      for (let stone of ships.stones){
        if (stone === 'BLANK'){
          count ++;
        }
      }
    }
    return count;
  }
  openMoveModal(card) {
    this.modalSelectedCard = card;
    this.setMoveModal.open();
  }

  showCardModal(card) {
    this.modalSelectedCard = card;
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

    let moveType = 'Play' + card + 'Move';

    switch (moveType) {
      case 'PlayChiselMove': {
        this.dragulaService.drop.subscribe((value) => {
          this.chiselDrop(value.slice(1));
        });
        break;
      }
      case 'PlayHammerMove': {
        this.HammerModal.open();

        this.dragulaService.drop.subscribe((value) => {
            this.hammerDrop(value.slice(1));
            this.HammerModal.close();
          });
        break;
      }
      case 'PlayLeverMove': {

        // Check if there is a ship which can sail
        let sailable:boolean = false;
        for (let ship of this.game.gameBoard.availableShips) {
          if (ship.sailable) sailable = true;
        }

        if (!sailable) {
          this.addCardToast('There is no ship which can sail!');
          this.setMoveModal.close();
          CardstackComponent.playCardMode = false;
          return;
        }

        this.dragulaService.drop.subscribe((value) => {
          this.leverDrop(value.slice(1));
        });
        break;
      }
      case 'PlaySailMove': {

        if (this.currentPlayer.stoneSupply === 0) {
          this.addCardToast('No stones available!');
          this.setMoveModal.close();
          CardstackComponent.playCardMode = false;
          return;
        }

        if (!this.hasFreeStoneSlots()) {
          this.addCardToast('All ships full!');
          this.setMoveModal.close();
          CardstackComponent.playCardMode = false;
          return;
        }

        this.addCardToast('Place 1 stone on 1 ship');

        this.dragulaService.drop.subscribe((value) => {
          this.sailDrop(value.slice(1));
        });
        break;
      }
    }

    this.setMoveModal.close();
  }

  isPlayerTurn() {
    return this.game.players[this.game.currentPlayerIndex].token === this.userToken;
  }

  // Works !!
  protected chiselDrop(args) {
    let [e, el] = args;
    let stonePos = e.parentElement.id.match(/(\d+)-(\d+)/);

    if (this.dropCount === 0) {
      this.ship1Index = stonePos[1];
      this.stone1Index = stonePos[2];
      this.dropCount++;
    } else {
      this.ship2Index = stonePos[1];
      this.stone2Index = stonePos[2];
      this.dropCount = 0;

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

  protected hammerDrop(args) {
    let [e, el] = args;
    let stonePos = e.parentElement.id.match(/(\d+)-(\d+)/);

    let moveJson = {
      'type': 'PlayHammerMove',
      'shipIndex': stonePos[1],
      'stoneIndex': stonePos[2]
    };

    CardstackComponent.playCardMode = false;

    this.moveService.addMove(this.game, moveJson).subscribe(() => console.log("hammer drop"));
  }

  protected leverDrop(args) {
    let [e, el] = args;

     // First Turn of lever, sail ship
    if (e.tagName === 'APP-SHIP') {
      this.shipIndex = (parseInt(e.id.match(/(\d+)/)[1]) - 1);
      this.site = SiteComponent.getDockedSite(el);

      let i = 0;
      for (let stone of this.game.gameBoard.availableShips[this.shipIndex].stones) {
        this.reordering[i] = i;
        this.stoneColorsIndexed[i] = stone;
        i++;
      }

      this.stoneReorderModal.open();

    }
  }

  leverSetNewOrder() {

    if (this.reordered.length < this.reordering.length) {
      for (let i = 0; i < this.reordering.length; i++) {

        if (this.stoneColorsIndexed[i] === 'BLANK') {
          this.reordered.push(i);
        }

      }
    }

    let moveJson = {
      'type': 'PlayLeverMove',
      'shipIndex': this.shipIndex,
      'site': this.site,
      'reordering': this.reordered
    };

    this.moveService.addMove(this.game, moveJson).subscribe(() => {
      this.stoneReorderModal.close();
      this.dropCount = 0;
      CardstackComponent.playCardMode = false;
    });
  }

  leverReset() {
    this.reordered = [];

    for (let i = 0; i < this.reordering.length; i++) {
      this.game.gameBoard.availableShips[this.shipIndex].stones[i] = this.stoneColorsIndexed[i];
    }

  }

  protected sailDrop(args) {
    let [e, el] = args;

    if (!CardstackComponent.playCardMode) {
      return;
    }

    switch (e.tagName) {
      case 'APP-STONE': {
        let stonePos = e.parentElement.id.match(/(\d+)-(\d+)/);
        this.shipIndex = stonePos[1];
        this.stoneIndex = stonePos[2];

        // Count the stones
        let stoneCount = 0;
        for (let stone of this.game.gameBoard.availableShips[this.shipIndex].stones) {
          if (stone !== 'BLANK') stoneCount++;
        }

        // And the newly dropped stone...
        stoneCount++;

        // Check if ship is eligible to sail
        if (this.game.gameBoard.availableShips[this.shipIndex].stones.length - 1 <= stoneCount) {
          let shipId = parseInt(stonePos[1]) + 1;
          document.getElementById('ship' + shipId).classList.remove('donotdrag');
        }

        this.addCardToast('Sail the ship to a site');

        break;
      }
      case 'APP-SHIP': {
        let shipIndex = (parseInt(e.id.match(/(\d+)/)[1]) - 1).toString();
        let site = el.id;

        let moveJson = {
          "type": "PlaySailMove",
          "shipIndex": this.shipIndex,
          "stoneIndex": this.stoneIndex,
          "site": SiteComponent.getDockedSite(el)
        };

        CardstackComponent.playCardMode = false;

        this.moveService.addMove(this.game, moveJson).subscribe(() => console.log('sailed with card'));

      }
    }
  }

  private addCardToast(text: string) {
      let toastOptions:ToastOptions = {
        title: text,
        showClose: true,
        timeout: 3000,
        theme: 'material',
        onAdd: (toast:ToastData) => {
        },
        onRemove: function(toast:ToastData) {
        }
      };
      this.toastyService.info(toastOptions);
  }

  private hasFreeStoneSlots() {
    let hasSlots: boolean = false;

    for (let ship of this.game.gameBoard.availableShips) {
      for (let slot of ship.stones) {
        if (slot === 'BLANK') {
          hasSlots = true;
          break;
        }
      }
    }

    return hasSlots;
  }

}
