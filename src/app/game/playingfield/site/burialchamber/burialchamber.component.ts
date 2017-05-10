import {
  animate, Component, Input, OnChanges, OnInit, SimpleChanges, state, style, transition,
  trigger
} from '@angular/core';

@Component({
  selector: 'app-burialchamber',
  templateUrl: './burialchamber.component.html',
  styleUrls: ['./burialchamber.component.css'],
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
export class BurialchamberComponent implements OnInit {
  @Input('burialChamber') burialChamber;
  @Input('dockOpen') dockOpen;
  @Input('showBorder') showBorder;
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
