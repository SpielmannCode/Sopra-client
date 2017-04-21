import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-burialchamber',
  templateUrl: './burialchamber.component.html',
  styleUrls: ['./burialchamber.component.css']
})
export class BurialchamberComponent implements OnInit {
  @Input('burialChamber') burialChamber;
  @Input('dockOpen') dockOpen;
  fields;
  sumB = 0;
  divArray = Array(24).fill(0);
  display = false;


  constructor() {
    this.fields = Array(24).fill(0);

  }
  ngOnChanges() {
    this.sumB=this.burialChamber.stones.length;

  }
  enter(){
    this.display = true;
  }
  leave(){
    this.display = false;
  }
  ngOnInit() {
    this.display = false;
  }


}
