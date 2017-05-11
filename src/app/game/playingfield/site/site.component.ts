import {Component, Input, OnInit} from '@angular/core';
import {MoveService} from "../../../shared/services/move.service";
import {Game} from "../../../shared/models/game";
import {GameService} from "../../../shared/services/game.service";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  @Input('game') game: Game;
  @Input('shipStoneState') shipStoneState;
  showBorder = false;

  constructor(protected moveService: MoveService,
              private gameService: GameService) { }

  ngOnInit() {
  }

  placeStonesOn(el, shipIndex: string, shipInstance) {

    switch(el.id) {
      case 'PyramidDock': {
        shipInstance.shipStoneState = 'onSitePyramid';
        break;
      }
      case 'TempleDock': {
        shipInstance.shipStoneState = 'onSiteTemple';
        break;
      }
      case 'BurialDock': {
        shipInstance.shipStoneState = 'onSiteBurialChamber';
        break;
      }
      case 'ObeliskDock': {
        shipInstance.shipStoneState = 'onSiteObelisk';
        break;
      }
    }

    setTimeout(() => {
      this.sailShip(SiteComponent.getDockedSite(el), shipIndex);
    }, 600)
  }

  sailShip(site: string, shipIndex: string) {
    let moveJson = {
      "type": "SailMove",
      "shipIndex": shipIndex,
      "site": site
    };

    this.moveService.addMove(this.game, moveJson).subscribe(() => this.gameService.getGame(this.game.id));
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
