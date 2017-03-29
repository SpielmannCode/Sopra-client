import {Injectable, isDevMode} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Game} from "../models/game";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable()
export class GameService {

  constructor(private http: Http,
              private apiService: ApiService) {}

  createGame(nameAndPlayerCount, currentUserToken): Observable<Response> {

    // Create a new game
    return this.http.post(this.apiService.apiUrl + '/games?token=' + currentUserToken,
      JSON.stringify(nameAndPlayerCount), this.apiService.options);
  }

  initBoard(game: Game): Observable<Response> {
    return this.http.post(this.apiService.apiUrl + '/games/' + game.id + '?token=' + game.owner, null, this.apiService.options);
  }

  getGames(): Observable<Game[]> {
    // add authorization header with token

    // get  from api
    return this.http.get(this.apiService.apiUrl +'/games')
      .map((response: Response) => response.json());
  }

  getGame(gameId): Observable<Game> {
    return this.http.get(this.apiService.apiUrl + '/games/' + gameId)
      .map((response: Response) => response.json());
  }

  changeSettings(game): Observable<Response> {
    return this.http.post(this.apiService.apiUrl + '/games/' + game.id + '/settings?name=' + game.name +'&playercount=' + game.playerCountSetting,
      null, this.apiService.options);
  }

  addPlayer(game, currentUserToken): Observable<Response> {
    return this.http.post(this.apiService.apiUrl + '/games/' + game.id + '/players?token=' + currentUserToken,
      null, this.apiService.options);
  }

  removePlayer(game, currentUserToken): Observable<Response> {
    return this.http.delete(this.apiService.apiUrl + '/games/' + game.id + '/players?token=' + currentUserToken);
  }

}
