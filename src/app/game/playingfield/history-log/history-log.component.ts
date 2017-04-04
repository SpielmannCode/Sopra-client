import {Component, Input, OnChanges, OnInit, OnDestroy} from '@angular/core';
import {Move} from '../../../shared/models/move';
import {Game} from '../../../shared/models/game';
import {MoveService} from '../../../shared/services/move.service';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-history-log',
  templateUrl: './history-log.component.html',
  styleUrls: ['./history-log.component.css']
})
export class HistoryLogComponent implements OnInit, OnChanges {
  protected moves: Move[] = [];
  @Input('game') game: Game;
  protected moveObservable: Subscription;
  protected gameId: number;


  constructor(protected moveservice: MoveService, protected route: ActivatedRoute) { }

  ngOnInit() {
    let self = this;
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      self.startMoveRefresh();});
  }
  startMoveRefresh() {
    this.moveObservable = Observable.interval(3000).subscribe(() => {
      this.moveservice.getMoves(this.gameId).subscribe(moves => {

        if (JSON.stringify(this.moves) !== JSON.stringify(moves)) {
          this.moves = moves;
        }

      });
    });
  }
  ngOnDestroy() {
    this.moveObservable.unsubscribe();
  }
  ngOnChanges(){
    this.moveservice.getMoves(this.game.id).subscribe(moves => {
      this.moves = moves;
    });
  }

}
