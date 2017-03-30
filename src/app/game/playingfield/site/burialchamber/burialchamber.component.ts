import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-burialchamber',
  templateUrl: './burialchamber.component.html',
  styleUrls: ['./burialchamber.component.css']
})
export class BurialchamberComponent implements OnInit {
  fields;

  constructor() {
    this.fields = Array(24).fill(0);

  }

  ngOnInit() {
  }

}
