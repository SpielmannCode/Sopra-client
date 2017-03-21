import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/models/game";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";

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

  constructor(private userService: UserService) { }

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
}
