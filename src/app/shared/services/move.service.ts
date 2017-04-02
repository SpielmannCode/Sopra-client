import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {ApiService} from './api.service';
import {Game} from '../models/game';
import {Observable} from 'rxjs';

@Injectable()
export class MoveService {

  constructor(private http: Http,
              private apiService: ApiService) { }


  addMove(game: Game, moveJson): Observable<Response>{
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;

    if (game.players[game.currentPlayerIndex].token === currentUserToken) {
      return this.http.post(this.apiService.apiUrl + '/games/' + game.id + '/moves?token=' + currentUserToken,
        JSON.stringify(moveJson), this.apiService.options);
    } else {
      console.log('not allowed');
    }
  }

}
