import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/models/game";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {GameService} from "../shared/services/game.service";
import {ApiService} from "../shared/services/api.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  users: User[] = [];
  games: Game[] = [];
  selectedGame: Game;
  createGameForm: FormGroup;

  constructor(private userService: UserService,
              private gameService: GameService,
              private apiService: ApiService,
              private fb: FormBuilder,
              private http: Http) {

    this.createGameForm = fb.group({
      name: ["", Validators.required],
      playerCountSettings:[]
    });
  }

  ngOnInit() {
    // get users from secure api end point
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });

    this.gameService.getGames()
      .subscribe(games => {
        this.games = games;
      });
  }

  selectGame(game: Game) {
    this.selectedGame = game;
  }

  createGame() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let userToken = JSON.parse(localStorage.getItem('currentUser')).token;

    this.http.post(this.apiService.apiUrl + '/games?token=' + userToken,
      JSON.stringify(this.createGameForm.value), options).subscribe(() => this.ngOnInit());
  }
}
