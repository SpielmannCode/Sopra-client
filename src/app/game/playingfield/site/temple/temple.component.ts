import {
  animate, Component, Input, OnChanges, OnInit, SimpleChanges, state, style, transition,
  trigger
} from '@angular/core';

@Component({
  selector: 'app-temple',
  templateUrl: './temple.component.html',
  styleUrls: ['./temple.component.css'],
  animations: [
    trigger('stoneEnter', [
      state('in', style({opacity: '1', transform: 'scale(1)'})),
      transition('void => *', [
        style({opacity: '0', transform: 'scale(0.5)'}),
        animate(500)
      ])
    ])
  ]
})
export class TempleComponent implements OnInit,OnChanges {
  @Input('templeSite') templeSite;
  @Input('dockOpen') dockOpen;
  @Input('showBorder') showBorder;
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
    this.sumT=this.templeSite.stones.length;
    this.sizeT = this.templeSite.stones.length;

    this.x= Math.floor(this.sizeT/this.templeSite.size);
    if(this.templeSite.numberOfStones==0){this.indexT= 100;}
    else {this.indexT=(this.templeSite.numberOfStones % this.templeSite.size);}

}
}
