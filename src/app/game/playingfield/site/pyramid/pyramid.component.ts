import {
  Component, Input, OnInit, OnChanges, animate, style, transition, state, trigger,
  keyframes
} from '@angular/core';

@Component({
  selector: 'app-pyramid',
  templateUrl: './pyramid.component.html',
  styleUrls: ['./pyramid.component.css'],
  animations: [
    trigger('stoneEnter', [
      transition('void => *', [
        animate(500, keyframes([
          style({
            opacity: '0', transform: 'scale(0.5)',
          }),
          style({
            opacity: '1', transform: 'scale(1)',
          })
        ])),
        animate(7000, keyframes([
          style({
            boxShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #FFDD1B, 0 0 35px #FFDD1B, 0 0 40px #FFDD1B, 0 0 50px #FFDD1B, 0 0 75px #FFDD1B'
          }),
          style({
            boxShadow: '0 0 2.5px #fff, 0 0 5px #fff, 0 0 7.5px #fff, 0 0 10px #FFDD1B, 0 0 17.5px #FFDD1B, 0 0 20px #FFDD1B, 0 0 25px #FFDD1B, 0 0 37.5px #FFDD1B'
          })
        ]))
      ])
    ])
  ]
})
export class PyramidComponent implements OnInit, OnChanges {
  @Input('pyramidSite') pyramidSite;
  @Input('dockOpen') dockOpen;
  @Input('showBorder') showBorder;
  fields;
  divArrayLv1 : number[] = [2,1,3,2,4,3,2,1,3];
  divArrayLv2 : number[] = [2,3,1,3];
  divArrayLv3 : number[] = [4];
  display = false;
  sumP:number=0;

  constructor() {

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
  ngOnChanges() {
    this.sumP=this.pyramidSite.stones.length;
  }
}
