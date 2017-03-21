import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/models/game";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {Http, RequestOptions, Headers, Response} from "@angular/http";

// Backend noch nix funktionere, darum ich habe gemacht diese
const GAMES: Game[] = [
  new Game("Game1", true, 4),
  new Game("Game2", false, 3),
  new Game("Game3", false, 2)
];

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  users: User[] = [];
  games: Game[] = GAMES;
  selectedGame: Game;
  createGameForm: FormGroup;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private http: Http) {
    this.createGameForm = fb.group({
      name: ["", Validators.required]
    });
  }

  ngOnInit() {
    // get users from secure api end point
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  selectGame(game: Game) {
    this.selectedGame = game;
  }

  createGame() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let userToken = JSON.parse(localStorage.getItem('currentUser')).token;


    return this.http.post('http://localhost:8080/games?token=' + userToken,
      JSON.stringify(this.createGameForm.value), options).subscribe();
  }
}
