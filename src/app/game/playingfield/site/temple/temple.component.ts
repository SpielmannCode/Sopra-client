import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-temple',
  templateUrl: './temple.component.html',
  styleUrls: ['./temple.component.css']
})
export class TempleComponent implements OnInit,OnChanges {
  @Input('templeSite') templeSite;
  @Input('dockOpen') dockOpen;
  sumT:number=0;
  sizeT:number=0;
  x: number=0;
  indexT: number=0;
  divArray4 = Array(4).fill(0);
  divArray5 = Array(5).fill(0);
  display = false;



  constructor() { }
  enter(){
    this.display = true;
  }
  leave(){
    this.display = false;
  }
  ngOnInit() {
    this.display = false;
  }

  ngOnChanges() {
    for(let stone of this.templeSite.stones){ this.sumT = this.sumT + stone;}
    this.sizeT = this.templeSite.stones.length;

    this.x= Math.floor(this.sizeT/this.templeSite.size);
    if(this.templeSite.numberOfStones==0){this.indexT= 100;}
    else {this.indexT=(this.templeSite.numberOfStones % this.templeSite.size);}

}
}
