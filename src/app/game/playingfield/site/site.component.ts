import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  static placeStonesOn(dockName: string) {

    switch(dockName) {
      case 'MarketDock': {
        console.log('market');
        break;
      }
      case 'PyramidDock': {
        console.log('pyramid');
        break;
      }
      case 'TempleDock': {
        console.log('temple');
        break;
      }
      case 'BurialDock': {
        console.log('burialchamber');
        break;
      }
      case 'ObeliskDock': {
        console.log('obelisk');
        break;
      }
    }

  }
}
