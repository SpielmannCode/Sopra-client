import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-temple',
  templateUrl: './temple.component.html',
  styleUrls: ['./temple.component.css']
})
export class TempleComponent implements OnInit {
  @Input('templeSite') templeSite;
  sumT:number=0;


  constructor() { }

  ngOnInit() {
  /*  for(let stone of this.templeSite.stones)
      this.sumT = this.sumT + stone;
      */
  }

}
