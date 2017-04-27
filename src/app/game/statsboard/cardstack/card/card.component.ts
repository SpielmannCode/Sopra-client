import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  @Input('cardName') cardName;
  currentImage;
  static cardImages = {
    'Burial_Chamber_Decoration': ['/assets/Images/LResmarketCards/Card_Burial_Chamber_Decoration.png', 'GREEN'],
    'Chisel': ['/assets/Images/LResmarketCards/Card_Chisel.png', 'BLUE'],
    'Entrance': ['/assets/Images/LResmarketCards/Card_Entrance.png', 'RED'],
    'Hammer': ['/assets/Images/LResmarketCards/Card_Hammer.png', 'BLUE'],
    'Lever': ['/assets/Images/LResmarketCards/Card_Lever.png', 'BLUE'],
    'Obelisk_Decoration': ['/assets/Images/LResmarketCards/Card_Obelisk_Decoration.png', 'GREEN'],
    'Paved_Path': ['/assets/Images/LResmarketCards/Card_Paved_Path.png', 'RED'],
    'Pyramid_Decoration': ['/assets/Images/LResmarketCards/Card_Pyramid_Decoration.png', 'GREEN'],
    'Sail': ['/assets/Images/LResmarketCards/Card_Sail.png', 'BLUE'],
    'Sarcophagus': ['/assets/Images/LResmarketCards/Card_Sarcophagus.png', 'RED'],
    'Statue': ['/assets/Images/LResmarketCards/Card_Statue.png', 'VIOLET'],
    'Temple_Decoration': ['/assets/Images/LResmarketCards/Card_Temple_Decoration.png', 'GREEN']
  };

  constructor() { }

  ngOnInit() {
    this.currentImage = CardComponent.cardImages[this.cardName][0];
  }

  ngOnChanges() {
    this.currentImage = CardComponent.cardImages[this.cardName][0];
  }

  static getCardColor(cardName) {
    return CardComponent.cardImages[cardName][1];
  }

}
