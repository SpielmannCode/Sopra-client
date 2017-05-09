import {Component, Input, OnInit, OnChanges, animate, style, transition, state, trigger} from '@angular/core';

@Component({
  selector: 'app-pyramid',
  templateUrl: './pyramid.component.html',
  styleUrls: ['./pyramid.component.css'],
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
