import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class LobbyComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  selectedGame: Game;
  createGameForm: FormGroup;
  gameObservable;
  gamesObservable;
  gameId;
  Music = new Audio();

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

    this.gamesObservable = Observable.interval(3000).subscribe(() => {
      this.getGames();
    });
    this.Music.volume = 0.1;
    this.Music.loop = true;
    this.Music.muted = true;
    this.Music.src= '/assets/musik/AncientEgyptianMusic-ImhoteptheHighPriest.mp3';
    this.Music.load();
    this.Music.play();
  }

  ngOnDestroy() {
    this.gamesObservable.unsubscribe();
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
  toggleAudio() {
    if(this.Music.muted ){
      this.Music.muted = false;
    }
    else {
      this.Music.muted = true;
    }
  }

  createGame() {
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;
    if(!this.Music.muted){
      this.toggleAudio();
    }

    this.gameService.createGame(this.createGameForm.value, currentUserToken)
      .subscribe(res => {
        // Extract the game id from the response
        let gameId = res['_body'].replace(/\/games\//, '');

        this.gameService.getGame(gameId).subscribe(game => {
          // Set the playerCountSetting from the form
          game.playerCountSetting = this.createGameForm.value.playerCountSetting;
          this.gameService.changeSettings(game).subscribe(() => this.router.navigateByUrl('/lobby/' + game.id));
        })
      });

  }

  addPlayer(game: Game) {
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;
    if(!this.Music.muted){
      this.toggleAudio();
    }

    this.gameService.addPlayer(game, currentUserToken)
      .subscribe(() => {
        this.router.navigateByUrl('/lobby/' + game.id);
      });
  }
}

