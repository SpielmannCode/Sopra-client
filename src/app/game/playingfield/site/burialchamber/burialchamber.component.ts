import {
  animate, Component, Input, keyframes, OnChanges, OnInit, SimpleChanges, state, style, transition,
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
