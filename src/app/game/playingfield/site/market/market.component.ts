import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent implements OnInit {
  @Input('marketSite') marketSite;

  constructor() { }

  ngOnInit() {
  }
}
