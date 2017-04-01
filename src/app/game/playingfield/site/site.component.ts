import {Component, Input, OnInit} from '@angular/core';
import {MoveService} from "../../../shared/services/move.service";
import {Game} from "../../../shared/models/game";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  @Input('game') game: Game;

  constructor(private moveService: MoveService) { }

  ngOnInit() {
  }

  placeStonesOn(el, shipIndex: string) {
    switch(el.id) {
      case 'MarketDock': {
        console.log('market');
        break;
      }
      case 'PyramidDock': {
        this.sailShip('Pyramid Site', shipIndex);
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

  sailShip(site: string, shipIndex: string) {
    let moveJson = {
      "type": "SailMove",
      "shipIndex": shipIndex,
      "site": site
    };

    this.moveService.addMove(this.game, moveJson).subscribe(() => console.log('sailed'));
  }
}
