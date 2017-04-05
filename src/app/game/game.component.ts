import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/models/user';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../shared/services/game.service';
import {Game} from '../shared/models/game';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  protected users: User[] = [];
  protected gameId: number;
  protected game: Game;
  protected gameObservable: Subscription;

  constructor(protected userService: UserService,
              protected gameService: GameService,
              protected route: ActivatedRoute) { }

  ngOnInit() {
    let self = this;

    // get users from secure api end point
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });

    this.route.params.subscribe(params => {
      this.gameId = params['id'];

      this.gameService.getGame(this.gameId).subscribe(game => {
          this.game = game;
      });

      self.startGameRefresh();
    });
  }

  ngOnDestroy() {
    this.gameObservable.unsubscribe();
  }

  startGameRefresh() {
    this.gameObservable = Observable.interval(3000).subscribe(() => {
      this.gameService.getGame(this.gameId).subscribe(game => {

        if (JSON.stringify(this.game) !== JSON.stringify(game)) {
          this.game = game;
        }

      });
    });
  }

  stopGameRefresh() {
    this.gameObservable.unsubscribe();
  }
}
