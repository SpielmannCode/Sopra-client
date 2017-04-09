import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pyramid',
  templateUrl: './pyramid.component.html',
  styleUrls: ['./pyramid.component.css']
})
export class PyramidComponent implements OnInit {
  @Input('pyramidSite') pyramidSite;
  @Input('dockOpen') dockOpen;

  constructor() {
  }

  ngOnInit() {

  }
}
