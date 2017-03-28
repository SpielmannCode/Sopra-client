import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {
  size = 4;
  picloc: string = ('/assets/Images/Ship/Ship_' + this.size + 'er.png');


constructor() { }

  ngOnInit() {
    this.size = 4;
    this.picloc = ('/assets/Images/Ship/Ship_' + this.size + 'er.png');
  }

}
