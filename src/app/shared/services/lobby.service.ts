import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {GameService} from "./game.service";
import {Observable} from "rxjs";

@Injectable()
export class LobbyService implements CanActivate {

  constructor(private gameService: GameService,
              private router: Router) { }

  canActivate(currentRoute): Observable<boolean>|boolean {
    let gameId = currentRoute.url[1].path;

    return this.gameService.getGame(gameId).map((game) => {

      // Check if the user with the current token is in the game with the given gameId
      let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;

      for (let player of game.players) {
        if (player.token === currentUserToken) {
          return true;
        }
      }

      this.router.navigateByUrl('/lobby');
      return false;
    });
  }

}
