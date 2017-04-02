import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from "../../shared/services/game.service";
import {Game} from "../../shared/models/game";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalModule} from "ng2-modal";

@Component({
  selector: 'app-waiting-lobby',
  templateUrl: './waiting-lobby.component.html',
  styleUrls: ['./waiting-lobby.component.css']
})
export class WaitingLobbyComponent implements OnInit, OnDestroy {
  gameId;
  selectedGame: Game;
  gameObservable: Subscription;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router,
              private modal: ModalModule) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];

      this.gameService.getGame(this.gameId)
        .subscribe(game => {
          this.selectedGame = game;
        });

      this.gameObservable = Observable.interval(5000).subscribe(() => {

        this.gameService.getGame(this.gameId)
          .subscribe(game => {
            this.selectedGame = game;
          });
      });

    });
  }

  ngOnDestroy() {
    this.gameObservable.unsubscribe();
  }

  startGame(game: Game) {
    this.gameService.initBoard(game).subscribe(() => this.router.navigateByUrl('/game/' + game.id));
  }

  removePlayer(game: Game) {
    let currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;

    this.gameService.removePlayer(game, currentUserToken).subscribe(() => {
      this.router.navigateByUrl('/lobby');
    })
  }

}
