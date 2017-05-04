import {animate, Component, Input, OnInit, state, style, transition, trigger} from '@angular/core';
import {Observable} from "rxjs";
import {MoveService} from "../../../shared/services/move.service";

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css'],
  animations: [
    trigger('shipStoneState', [
      state('onShip', style({
        transform: 'translateX(0)'
      })),
      state('onSitePyramid', style({
        transform: 'translateX(-390px)'
      })),
      state('onSiteRight', style({
        transform: 'translateX(300px)'
      })),
      state('onSiteTemple', style({
        transform: 'translateX(340px)'
      })),
      state('onSiteBurialChamber', style({
        transform: 'translateX(190px)'
      })),
      state('onSiteObelisk', style({
        transform: 'translateX(250px)'
      })),
      transition('onShip => onSitePyramid', animate('500ms ease-in')),
      transition('onSitePyramid => onShip', animate('500ms')),

      transition('onShip => onSiteRight', animate('500ms ease-in')),
      transition('onSiteRight => onShip', animate('500ms')),

      transition('onShip => onSiteTemple', animate('500ms ease-in')),
      transition('onSiteTemple => onShip', animate('500ms')),

      transition('onShip => onSiteBurialChamber', animate('500ms ease-in')),
      transition('onSiteBurialChamber => onShip', animate('500ms')),

      transition('onShip => onSiteObelisk', animate('500ms ease-in')),
      transition('onSiteObelisk => onShip', animate('500ms'))
    ])
  ]
})
export class ShipComponent implements OnInit {
  size: number;
  @Input('stones') stones;
  @Input('shipIndex') shipIndex;
  @Input('reorderMode') reorderMode;
  @Input('HammerMode') HammerMode: boolean;
  @Input('isDocked') isDocked: boolean;
  @Input('game') game;
  @Input('reordering') reordering;
  @Input('stoneColorsIndexed') stoneColorsIndexed;
  @Input('reordered') reordered;

  picloc: string = ('/assets/Images/Ship/Ship_' + this.size + 'er.png');

  shipStoneState = 'onShip';

  constructor(private moveService: MoveService) { }

  ngOnInit() {
    this.size = this.stones.length;
    this.picloc = ('/assets/Images/Ship/Ship_' + this.size + 'er.png');
  }

  addReordered(index) {

    if ((this.reordered.length < this.size) && (this.stones[index] !== 'BLANK')) {
      this.reordered.push(this.reordering[index]);
      this.stones[index] = 'BLANK';
    }

  }
}
