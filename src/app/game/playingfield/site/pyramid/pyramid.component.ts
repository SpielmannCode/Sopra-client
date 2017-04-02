import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pyramid',
  templateUrl: './pyramid.component.html',
  styleUrls: ['./pyramid.component.css']
})
export class PyramidComponent implements OnInit {
  @Input('pyramidSite') pyramidSite;
  sumP:number=0;

  constructor() { }

  ngOnInit() {
    /*
    for(let stone of this.pyramidSite.stones)
      this.sumP = this.sumP + stone;
      */
  }

}
