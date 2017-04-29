import {animate, Component, Input, OnInit, state, style, transition, trigger} from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css'],
  animations: [
    trigger('shipStoneState', [
      state('onShip', style({
        transform: 'translateX(0)'
      })),
      state('onSiteLeft', style({
        transform: 'translateX(-300px)'
      })),
      state('onSiteRight', style({
        transform: 'translateX(300px)'
      })),
      transition('onShip => onSiteLeft', animate('500ms')),
      transition('onSiteLeft => onShip', animate('500ms')),
      transition('onShip => onSiteRight', animate('500ms')),
      transition('onSiteRight => onShip', animate('500ms'))
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
  picloc: string = ('/assets/Images/Ship/Ship_' + this.size + 'er.png');

  @Input('shipStoneState') shipStoneState;


constructor() { }

  ngOnInit() {
    this.size = this.stones.length;
    this.picloc = ('/assets/Images/Ship/Ship_' + this.size + 'er.png');
  }

  toggleShipStoneState() {
    if (this.shipStoneState === 'onShip') {
      this.shipStoneState = 'onSiteRight';
    } else {
      this.shipStoneState = 'onShip';
    }
  }

}
