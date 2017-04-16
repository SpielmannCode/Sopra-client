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

  constructor(protected moveService: MoveService) { }

  ngOnInit() {
  }

  placeStonesOn(el, shipIndex: string) {
    this.sailShip(SiteComponent.getDockedSite(el), shipIndex);
  }

  sailShip(site: string, shipIndex: string) {
    let moveJson = {
      "type": "SailMove",
      "shipIndex": shipIndex,
      "site": site
    };

    this.moveService.addMove(this.game, moveJson).subscribe(() => console.log('sailed'));
  }

  isPlayerTurn():boolean {
    return this.game.players[this.game.currentPlayerIndex].token === JSON.parse(localStorage.getItem('currentUser')).token;
  }

  // Get docked site by dock div id
  static getDockedSite(el: any):string {
    switch(el.id) {
      case 'MarketDock': {
        return 'Market Site';
      }
      case 'PyramidDock': {
        return 'Pyramid Site';
      }
      case 'TempleDock': {
        return 'Temple Site';
      }
      case 'BurialDock': {
        return 'Burial Chamber Site';
      }
      case 'ObeliskDock': {
        return 'Obelisk Site';
      }
    }
  }
}
