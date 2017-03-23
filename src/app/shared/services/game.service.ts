import {Injectable, isDevMode} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Game} from "../models/game";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable()
export class GameService {

  constructor(private http: Http,
              private apiService: ApiService) {}


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
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiService.apiUrl + '/games/' + game.id + '/settings?name=' + game.name +'&playercount=' + game.playerCountSetting, null, options);
  }

  addPlayer(game): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;

    return this.http.post(this.apiService.apiUrl + '/games/' + game.id + '/players?token=' + currentUserToken, null, options);
  }

}
