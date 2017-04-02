import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-obelisk',
  templateUrl: './obelisk.component.html',
  styleUrls: ['./obelisk.component.css']
})
export class ObeliskComponent implements OnInit {
  @Input('obeliskSite') obeliskSite;
  sumO:number = 0;

  constructor() { }

  ngOnInit() {
    for(let stone of this.obeliskSite.stones)
      this.sumO = this.sumO + stone;
  }

}
