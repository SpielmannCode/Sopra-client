import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/models/game";
import {UserService} from "../shared/services/user.service";
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {GameService} from "../shared/services/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  games: Game[] = [];
  selectedGame: Game;
  createGameForm: FormGroup;
  gameId;

  constructor(protected userService: UserService,
              protected gameService: GameService,
              protected fb: FormBuilder,
              protected route: ActivatedRoute,
              protected modal: ModalModule,
              protected router: Router) {

    this.createGameForm = fb.group({
      name: ["", Validators.required],
      playerCountSetting:[]
    });
  }

  ngOnInit() {
    this.getGames();

    Observable.interval(5000).subscribe(() => {
      this.getGames();
    });

    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      if (this.gameId) {
        this.getGame(this.gameId);
        Observable.interval(5000).subscribe(() => {
          this.getGame(this.gameId);
        });
      }
    });
  }

  getGame(id) {
    this.gameService.getGame(id)
      .subscribe(game => {
        this.selectedGame = game;
      });
  }

  getGames() {
    this.gameService.getGames()
      .subscribe(games => {
        this.games = games;
      });
  }

  isInGame(game: Game): boolean {
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;

    for (let player of game.players) {
      if (player.token === currentUserToken) {
        return true;
      }
    }

    return false;
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

  removePlayer(game: Game) {
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;

    this.gameService.removePlayer(game, currentUserToken).subscribe(() => {
      this.router.navigateByUrl('/lobby');
    })

  }
}
