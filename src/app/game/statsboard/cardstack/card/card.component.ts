import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  currentImage;
  cardImages = {
    'Burial_Chamber_Decoration': '/assets/Images/marketCards/Card_Burial_Chamber_Decoration.png',
    'Chisel': '/assets/Images/marketCards/Card_Chisel.png',
    'Entrance': '/assets/Images/marketCards/Card_Entrance.png',
    'Hammer': '/assets/Images/marketCards/Card_Hammer.png',
    'Lever': '/assets/Images/marketCards/Card_Lever.png',
    'Obelisk_Decoration': '/assets/Images/marketCards/Card_Obelisk_Decoration.png',
    'Paved_Path': '/assets/Images/marketCards/Card_Paved_Path.png',
    'Pyramid_Decoration': '/assets/Images/marketCards/Card_Pyramid_Decoration.png',
    'Sail': '/assets/Images/marketCards/Card_Sail.png',
    'Sarcophagus': '/assets/Images/marketCards/Card_Sarcophagus.png',
    'Statue': '/assets/Images/marketCards/Card_Statue.png',
    'Temple_Decoration': '/assets/Images/marketCards/Card_Temple_Decoration.png'
  };

  constructor() { }

  ngOnInit() {
    this.getGard('Burial_Chamber_Decoration');
  }

  getGard(cardName: string) {
    this.currentImage = this.cardImages[cardName];
  }

}
