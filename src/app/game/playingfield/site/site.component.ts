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
        this.sailShip('Market Site', shipIndex);
        break;
      }
      case 'PyramidDock': {
        this.sailShip('Pyramid Site', shipIndex);
        break;
      }
      case 'TempleDock': {
        this.sailShip('Temple Site', shipIndex);
        break;
      }
      case 'BurialDock': {
        this.sailShip('Burial Chamber Site', shipIndex);
        break;
      }
      case 'ObeliskDock': {
        this.sailShip('Obelisk Site', shipIndex);
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
