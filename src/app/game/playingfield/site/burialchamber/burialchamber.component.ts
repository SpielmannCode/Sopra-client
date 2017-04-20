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
  sumB:number = 0;
  divArray = Array(24).fill(0);
  display = false;


  constructor() {
    this.fields = Array(24).fill(0);

  }

  ngOnInit() {
    /*
    for(let stone of this.burialChamberSite.stones)
      this.sumB = this.sumB + stone;
      */
  }
  enter(){
    this.display = true;
  }
  leave(){
    this.display = false;
  }

}
