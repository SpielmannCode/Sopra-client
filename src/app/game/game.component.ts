import {Component, OnDestroy, OnInit,ViewChild, OnChanges} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/models/user';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../shared/services/game.service';
import {Game} from '../shared/models/game';
import {Observable, Subscription} from 'rxjs/Rx';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {CardstackComponent} from "./statsboard/cardstack/cardstack.component";
import {MoveService} from "../shared/services/move.service";


@Component({
  selector: 'app-game',
  host: {'(window:keydown)': 'fastForward($event)'},
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy, OnChanges {
  protected users: User[] = [];
  protected gameId: number;
  protected game: Game;
  protected gameObservable: Subscription;
  private userToken;
  private _opened: boolean = false;
  rank1: string;
  rank2: string;
  rank3: string;
  rank4: string;
  private currentRound;
  protected timerPercentage;
  private pressFCount: number = 0;

  @ViewChild('rankingModal') rankingModal;

  constructor(protected userService: UserService,
              protected gameService: GameService,
              protected moveService: MoveService,
              protected route: ActivatedRoute,
              private toastyService:ToastyService,
              private toastyConfig: ToastyConfig) {
  }

  ngOnInit() {
    let self = this;
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
  }

  ngOnChanges(){

  }

  ngOnDestroy() {
    this.gameObservable.unsubscribe();
  }

  startGameRefresh() {
    this.gameObservable = Observable.interval(1000).subscribe(() => {
      this.gameService.getGame(this.gameId).subscribe(game => {

        if ((JSON.stringify(this.game) !== JSON.stringify(game)) && !CardstackComponent.playCardMode) {
          this.game = game;

          if (this.game.players[this.game.currentPlayerIndex].token === this.userToken) {
            this.addTurnToast();
          }

          if(this.game.status==='FINISHED'){
            this.rank1= this.game.players[this.game.rankingArray[0]].username;
            this.rank2= this.game.players[this.game.rankingArray[1]].username;

            if(this.game.playerCountSetting>2) {
              this.rank3 = this.game.players[this.game.rankingArray[2]].username;
            }
            if(this.game.playerCountSetting>3) {

              this.rank4 = this.game.players[this.game.rankingArray[3]].username;
            }

            this.rankingModal.open();

          }


          if (this.game.currentRound !== this.currentRound) {
            this.addRoundToast();
            this.currentRound = this.game.currentRound;
          }
        }

        this.moveService.getRemainingTime(game).subscribe(timer => {
          this.timerPercentage = timer;
        });

      });


    });

  }

  stopGameRefresh() {
    this.gameObservable.unsubscribe();
  }

  fastForward(event) {
    if (event.keyCode === 70) {
      this.pressFCount++;

      if (this.pressFCount === 2) {
        this.addTurnToast();
        this.pressFCount = 0;
      }

    }
  }

  addTurnToast() {
    let toastOptions:ToastOptions;
    if (this.game.logicState === 'NORMAL'){
      toastOptions = {
        title: "Your Turn!",
        showClose: true,
        timeout: 4000,
        theme: 'material',
        onAdd: (toast:ToastData) => {
        },
        onRemove: function(toast:ToastData) {
        }
      };
    }
    else if (this.game.logicState === 'MARKET'){
      toastOptions = {
        title: "Choose a Market Card!",
        showClose: true,
        timeout: 4000,
        theme: 'material',
        onAdd: (toast:ToastData) => {
        },
        onRemove: function(toast:ToastData) {
        }
      };
    }

    this.toastyService.info(toastOptions);
  }

  addRoundToast() {
    let toastOptions:ToastOptions;
      toastOptions = {
        title: 'Round ' + this.game.currentRound + ' out of 6',
        showClose: true,
        timeout: 4000,
        theme: 'material',
        onAdd: (toast:ToastData) => {
        },
        onRemove: function(toast:ToastData) {
        }
      };

    this.toastyService.info(toastOptions);
  }

  static addClass(el: any, name: string) {
    el.className = el.className ? [el.className, name].join(' ') : name;
  }

  static removeClass(el: any, name: string) {
    el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
  }
  private toggleSidebar() {
    this._opened = !this._opened;
  }


}
