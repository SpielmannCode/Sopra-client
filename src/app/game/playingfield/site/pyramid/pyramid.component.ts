import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pyramid',
  templateUrl: './pyramid.component.html',
  styleUrls: ['./pyramid.component.css']
})
export class PyramidComponent implements OnInit {
  @Input('pyramidSite') pyramidSite;
  @Input('dockOpen') dockOpen;
  fields;
  divArrayLv1 : number[] = [2, 1, 3,2,4,3,2,1,3];
  divArrayLv2 : number[] = [1,3,2,3];
  divArrayLv3 : number[] = [4];
  display = false;


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
}
