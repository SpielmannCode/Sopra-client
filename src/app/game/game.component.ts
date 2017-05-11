import {Component, OnDestroy, OnInit, ViewChild, OnChanges} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../shared/services/game.service';
import {Game} from '../shared/models/game';
import {Observable, Subscription} from 'rxjs/Rx';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {CardstackComponent} from './statsboard/cardstack/cardstack.component';
import {MoveService} from '../shared/services/move.service';
import {ModalModule} from 'ng2-modal';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy, OnChanges {
  protected users: User[] = [];
  protected gameId: number;
  protected game: Game;
  protected gameObservable: Subscription;
  private userToken;
  private _opened = false;
  rank1: string;
  rank2: string;
  rank3: string;
  rank4: string;
  rank1p: string;
  rank2p: string;
  rank3p: string;
  rank4p: string;

  private currentRound;
  private currentState;
  protected timerPercentage;
  private pressFCount = 0;
  Music = new Audio();

  @ViewChild('rankingModal') rankingModal;

  constructor(protected userService: UserService,
              protected gameService: GameService,
              protected moveService: MoveService,
              protected route: ActivatedRoute,
              private toastyService: ToastyService,
              private router: Router,
              private toastyConfig: ToastyConfig) {
  }

  ngOnInit() {
    const self = this;
    this.userToken = JSON.parse(localStorage.getItem('currentUser')).token;

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

    this.rankingModal.open();
    this.rankingModal.close();
    this.currentState = 'MARKET';
    this.Music.volume = 0.2;
    this.Music.loop = true;
    this.Music.muted = true;
    this.Music.src = '/assets/musik/-Egyptian_music.mp3';
    this.Music.load();
    this.Music.play();
  }

  ngOnChanges(){

  }

  ngOnDestroy() {
    this.gameObservable.unsubscribe();
    this.Music.pause();
  }

  startGameRefresh() {
    this.gameObservable = Observable.interval(2000).subscribe(() => {
      this.gameService.getGame(this.gameId).subscribe(game => {

        if ((JSON.stringify(this.game) !== JSON.stringify(game)) && !CardstackComponent.playCardMode) {
          this.game = game;

          if (this.game.players[this.game.currentPlayerIndex].token === this.userToken) {
            this.addTurnToast();
          }

          if (this.game.status === 'FINISHED'){
            this.rank1 = this.game.players[this.game.rankingArray[0]].username ;
            this.rank2 = this.game.players[this.game.rankingArray[1]].username ;
            this.rank1p = this.game.players[this.game.rankingArray[0]].points + " Points" ;
            this.rank2p =  this.game.players[this.game.rankingArray[1]].points + " Points" ;

            if (this.game.playerCountSetting > 2) {
              this.rank3 = this.game.players[this.game.rankingArray[2]].username ;
              this.rank3p =  this.game.players[this.game.rankingArray[2]].points + " Points" ;
            }
            if (this.game.playerCountSetting > 3) {

              this.rank4 = this.game.players[this.game.rankingArray[3]].username ;
              this.rank4p =  this.game.players[this.game.rankingArray[3]].points + " Points" ;
            }

            this.rankingModal.open();

          }


          if (this.game.currentRound !== this.currentRound) {
            //this.addRoundToast();
            this.currentRound = this.game.currentRound;
          }
          if (this.game.logicState !== this.currentState) {
            this.currentState = this.game.logicState;
            if (this.currentState === 'NORMAL'){
              this.Music.pause();
              this.Music.src = '/assets/musik/-Egyptian_music.mp3';
              this.Music.load();
              this.Music.play();
            }
            else if (this.currentState === 'MARKET'){
              this.Music.pause();
              this.Music.src = '/assets/musik/marketsoundeffect.mp3';
              this.Music.load();
              this.Music.play();
            }
          }
        }

        this.moveService.getRemainingTime(game).subscribe(timer => {
          this.timerPercentage = timer;
        });

      });
    });
  }

  restartGame() {
    this.gameService.restartGame(this.game).subscribe(() => this.rankingModal.close());
  }

  leaveGame() {
    this.gameService.removePlayer(this.game, this.userToken).subscribe(() => this.router.navigateByUrl('/lobby'));
  }
  toggleAudio() {
    if (this.Music.muted ){
      this.Music.muted = false;
    }
    else {
      this.Music.muted = true;
    }
  }

  stopGameRefresh() {
    this.gameObservable.unsubscribe();
  }

  addTurnToast() {

    let toastOptions: ToastOptions;
    if (this.game.logicState === 'NORMAL'){
      toastOptions = {
        title: 'Your Turn!',
        showClose: true,
        timeout: 6000,
        theme: 'material',
        onAdd: (toast: ToastData) => {
        },
        onRemove: function(toast: ToastData) {
        }
      };
    }
    else if (this.game.logicState === 'MARKET'){
      toastOptions = {
        title: 'Choose a Market Card!',
        showClose: true,
        timeout: 6000,
        theme: 'material',
        onAdd: (toast: ToastData) => {
        },
        onRemove: function(toast: ToastData) {
        }
      };
    }

    this.toastyService.info(toastOptions);
  }

  private toggleSidebar() {
    this._opened = !this._opened;
  }

}
