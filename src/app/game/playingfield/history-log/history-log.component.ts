import {Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import {Move} from '../../../shared/models/move';
import {Game} from '../../../shared/models/game';
import {MoveService} from '../../../shared/services/move.service';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
import {GameComponent} from "../../game.component";

@Component({
  selector: 'app-history-log',
  templateUrl: './history-log.component.html',
  styleUrls: ['./history-log.component.css']
})
export class HistoryLogComponent implements OnInit, OnDestroy {
  protected moves: Move[] = [];
  @Input('game') game: Game;
  protected moveObservable: Subscription;
  protected gameId: number;
  private currentUserToken = JSON.parse(localStorage.getItem('currentUser')).token;



  constructor(protected moveService: MoveService,
              protected route: ActivatedRoute,
              private toastyService: ToastyService) {
  }

  ngOnInit() {
    let self = this;
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      self.startMoveRefresh();});
  }
  startMoveRefresh() {
    this.moveObservable = Observable.interval(2000).subscribe(() => {
      this.moveService.getMoves(this.gameId).subscribe(moves => {

        if (JSON.stringify(this.moves) !== JSON.stringify(moves)) {
          this.moves = moves;

          if (this.game.players[this.moves[this.moves.length - 1].userID - 1].token !== this.currentUserToken) {
            this.addMoveToast(this.moves[this.moves.length - 1].description);
          }
        }

      });
    });
  }
  ngOnDestroy() {
    this.moveObservable.unsubscribe();
  }

  addMoveToast(text) {
    let toastOptions: ToastOptions;
    toastOptions = {
      title: text,
      showClose: true,
      timeout: 4000,
      theme: 'material'
    };

    this.toastyService.info(toastOptions);
  }

}
