import {Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Game} from "../../shared/models/game";
import {DragulaService} from "ng2-dragula";
import {PyramidComponent} from "./site/pyramid/pyramid.component";
import {SiteComponent} from "./site/site.component";

@Component({
  selector: 'app-playingfield',
  templateUrl: './playingfield.component.html',
  styleUrls: ['./playingfield.component.css']
})
export class PlayingfieldComponent implements OnInit {

  @Input('game') game: Game;
  @ViewChild(SiteComponent) site: SiteComponent;

  constructor(protected dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  ngOnInit() {
  }

  protected onDrag(args) {
    let [e, el] = args;
    // do something
  }

  protected onDrop(args) {
    let [e, el] = args;
    this.removeClass(el, 'drop-border');

    let audio = new Audio();

    if (e.classList.contains('ship-wrapper')) {
      audio.src ='/assets/musik/fx/32304__acclivity__shipsbell.wav';
    } else {
      audio.src ='/assets/musik/fx/25847__freqman__concrete-blocks-moving3.wav';
    }

    audio.load();
    audio.play();
  }

  protected onOver(args) {
    let [e, el, container] = args;
    this.addClass(el , 'drop-border');
  }

  protected onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'drop-border');
  }

  protected addClass(el: any, name: string) {
    el.className = el.className ? [el.className, name].join(' ') : name;
  }

  protected removeClass(el: any, name: string) {
    el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
  }

}
