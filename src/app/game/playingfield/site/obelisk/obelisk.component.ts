import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-obelisk',
  templateUrl: './obelisk.component.html',
  styleUrls: ['./obelisk.component.css']
})
export class ObeliskComponent implements OnInit,OnChanges {
  @Input('obeliskSite') obeliskSite;
  @Input('dockOpen') dockOpen;
  @Input('playerCount') Playercount;
  @Input('showBorder') showBorder;
  sumO:number = 0;
  display = false;

  constructor() { }

  ngOnInit() {

  }
  ngOnChanges() {
    this.sumO=0;
    for(let stone of this.obeliskSite.stones){
      this.sumO = this.sumO + stone;
    }
  }
  enter(){
    this.display = true;
  }
  leave(){
    this.display = false;
  }

}
