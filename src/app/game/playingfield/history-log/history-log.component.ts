import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Move} from '../../../shared/models/move';
import {Game} from '../../../shared/models/game';
import {MoveService} from '../../../shared/services/move.service';

@Component({
  selector: 'app-history-log',
  templateUrl: './history-log.component.html',
  styleUrls: ['./history-log.component.css']
})
export class HistoryLogComponent implements OnInit, OnChanges {
  protected moves: Move[] = [];
  @Input('game') game: Game;

  constructor(protected moveservice: MoveService) { }

  ngOnInit() {
      this.moveservice.getMoves(1).subscribe(moves => {
        this.moves = moves;
      });
  }
  ngOnChanges(){
    this.moveservice.getMoves(1).subscribe(moves => {
      this.moves = moves;
    });
  }

}
