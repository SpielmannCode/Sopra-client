import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input('cardName') cardName;
  currentImage;
  cardImages = {
    'Burial_Chamber_Decoration': ['/assets/Images/marketCards/Card_Burial_Chamber_Decoration.png', 'GREEN'],
    'Chisel': ['/assets/Images/marketCards/Card_Chisel.png', 'BLUE'],
    'Entrance': ['/assets/Images/marketCards/Card_Entrance.png', 'RED'],
    'Hammer': ['/assets/Images/marketCards/Card_Hammer.png', 'BLUE'],
    'Lever': ['/assets/Images/marketCards/Card_Lever.png', 'BLUE'],
    'Obelisk_Decoration': ['/assets/Images/marketCards/Card_Obelisk_Decoration.png', 'GREEN'],
    'Paved_Path': ['/assets/Images/marketCards/Card_Paved_Path.png', 'RED'],
    'Pyramid_Decoration': ['/assets/Images/marketCards/Card_Pyramid_Decoration.png', 'GREEN'],
    'Sail': ['/assets/Images/marketCards/Card_Sail.png', 'BLUE'],
    'Sarcophagus': ['/assets/Images/marketCards/Card_Sarcophagus.png', 'RED'],
    'Statue': ['/assets/Images/marketCards/Card_Statue.png', 'VIOLET'],
    'Temple_Decoration': ['/assets/Images/marketCards/Card_Temple_Decoration.png', 'GREEN']
  };

  constructor() { }

  ngOnInit() {
    this.currentImage = this.cardImages[this.cardName][0];
  }
}
