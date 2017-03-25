import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/models/game";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {GameService} from "../shared/services/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalModule} from "ng2-modal";

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
  gameId;

  constructor(private userService: UserService,
              private gameService: GameService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private modal: ModalModule,
              private router: Router) {

    this.createGameForm = fb.group({
      name: ["", Validators.required],
      playerCountSetting:[]
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

    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      if (this.gameId) {
        this.gameService.getGame(this.gameId)
          .subscribe(game => {
            this.selectedGame = game;
          })
      }
    });
  }

  selectGame(game: Game) {
    this.selectedGame = game;
  }

  createGame() {
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;

    this.gameService.createGame(this.createGameForm.value, currentUserToken)
      .subscribe(res => {
        // Extract the game id from the response
        let gameId = res['_body'].replace(/\/games\//, '');

        this.gameService.getGame(gameId).subscribe(game => {
          // Set the playerCountSetting from the form
          game.playerCountSetting = this.createGameForm.value.playerCountSetting;
          this.gameService.changeSettings(game).subscribe(() => this.ngOnInit());
        })
      });
  }

  addPlayer(game: Game) {
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;

    this.gameService.addPlayer(game, currentUserToken)
      .subscribe(() => {
        this.router.navigateByUrl('/lobby/' + game.id);
      });
  }
}
