import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userinputfield',
  templateUrl: './userinputfield.component.html',
  styleUrls: ['./userinputfield.component.css']
})
export class UserinputfieldComponent implements OnInit {
  showCardStack: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleCardStack() {
    this.showCardStack = !this.showCardStack;
  }
}
