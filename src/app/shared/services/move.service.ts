import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {ApiService} from "./api.service";
import {Game} from "../models/game";
import {Observable} from "rxjs";

@Injectable()
export class MoveService {

  constructor(private http: Http,
              private apiService: ApiService) { }


  addMove(game: Game): Observable<Response> {
    return this.http.post(this.apiService.apiUrl + '/games/' + game.id + '/moves?token=' + game.players[game.currentPlayerIndex].token,
      null, this.apiService.options);
  }

}
