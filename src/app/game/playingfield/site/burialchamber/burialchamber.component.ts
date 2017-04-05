import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-burialchamber',
  templateUrl: './burialchamber.component.html',
  styleUrls: ['./burialchamber.component.css']
})
export class BurialchamberComponent implements OnInit {
  @Input('burialChamber') burialChamber;
  fields;
  sumB:number = 0;


  constructor() {
    this.fields = Array(24).fill(0);

  }

  ngOnInit() {
    /*
    for(let stone of this.burialChamberSite.stones)
      this.sumB = this.sumB + stone;
      */
  }

}
