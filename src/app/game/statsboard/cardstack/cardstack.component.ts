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
  siteName: string;

  reordering: number[] = [];
  reorderOutIndex: number;
  firstOut: boolean = true;

  constructor(private moveService: MoveService,
              private toastyService: ToastyService) {

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
    this.addCardToast('Play Card Mode');

    let moveType = 'Play' + card + 'Move';

    switch (moveType) {
      case 'PlayChiselMove': {
        this.dragulaService.drop.subscribe((value) => {
          this.chiselDrop(value.slice(1));
        });
        break;
      }
      case 'PlayHammerMove': {
        // Step One Excavate 3 stones from the quarry



        //check if you have a stone to place
        let playerSupply = this.game.players[this.game.currentPlayerIndex.valueOf()].stoneSupply.valueOf();
        if(playerSupply <= 0){
          this.addCardToast("Not enough stones to play this move!");
          CardstackComponent.playCardMode = false;
        }else{
          this.dragulaService.drop.subscribe((value) => {
            this.hammerDrop(value.slice(1));
          });
        }

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

        this.dragulaService.out.subscribe((value) => {
          this.leverOut(value.slice(1));
        });

        this.dragulaService.drop.subscribe((value) => {
          this.leverDrop(value.slice(1));
        });
        break;
      }
      case 'PlaySailMove': {
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
      "type": "PlayHammerMove",
      "shipIndex": stonePos[1],
      "stoneIndex": stonePos[2]
    };

    CardstackComponent.playCardMode = false;

    this.moveService.addMove(this.game, moveJson).subscribe(() => console.log("hammer drop"));
  }

  protected leverDrop(args) {
    let [e, el] = args;
    console.log('lever drop');


    // First Turn of lever, sail ship
    if (this.dropCount === 0) {


      this.shipIndex = (parseInt(e.id.match(/(\d+)/)[1]) - 1);

      this.siteName = SiteComponent.getDockedSite(el);
      console.log(this.siteName);

      // Fill reordering array
      let i = 0;
      for (let stonePos of this.game.gameBoard.availableShips[this.shipIndex].stones) {
        this.reordering[i] = i;
        i++;
      }
      console.log(this.reordering);

      let shipId = this.shipIndex + 1;
      document.getElementById('ship' + shipId).classList.add('donotdrag');
      this.dropCount++;
    } else {
      // Second Turn of lever, rearrange stones before dropping them to a site
      let stonePos = e.parentElement.id.match(/(\d+)-(\d+)/);
      stonePos = parseInt(stonePos[2]);





      //  Swap the positions
      let temp = this.reordering[stonePos];
      this.reordering[stonePos] = this.reordering[this.reorderOutIndex];
      this.reordering[this.reorderOutIndex] = temp;

      console.log('Reordered', this.reordering);
      this.firstOut = true;

      // let moveJson = {
      //   "type": "PlayLeverMove",
      //   "shipIndex": this.shipIndex,
      //   "site": this.siteName,
      //   "reordering": []
      // };

      // CardstackComponent.playCardMode = false;
      // this.moveService.addMove(this.game, moveJson).subscribe(() => console.log('lever finished'));

      // this.dropCount = 0;
    }
  }

  protected leverOut(args) {
    let [e, el] = args;

    if (e.tagName === 'APP-STONE' && this.firstOut) {

      let stonePos = e.parentElement.id.match(/(\d+)-(\d+)/);
      stonePos = parseInt(stonePos[2]);
      this.reorderOutIndex = stonePos;

      this.firstOut = false;
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

  // private setDraggable(bagName:string,draggable: boolean) {
  //
  //   const bag: any = this.dragulaService.find(bagName);
  //
  //   if (bag !== undefined) {
  //     this.dragulaService.destroy(bagName);
  //
  //
  //   this.dragulaService.setOptions(bagName, {
  //       moves: function(el, source, handle, sibling) {
  //         return draggable;
  //       }
  //     });
  //
  //   }
  // }

}
