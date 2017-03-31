import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {
  size: number;
  @Input('stones') stones;
  @Input('shipIndex') shipIndex;
  picloc: string = ('/assets/Images/Ship/Ship_' + this.size + 'er.png');


constructor() { }

  ngOnInit() {
    this.size = this.stones.length;
    this.picloc = ('/assets/Images/Ship/Ship_' + this.size + 'er.png');
  }

}
