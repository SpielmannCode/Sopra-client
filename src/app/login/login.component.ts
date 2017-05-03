import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";
import {Router} from "@angular/router";
import {User} from "../shared/models/user";

declare let smokemachine: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  model: any = {};
  loading = false;
  error = '';
  user: User;

  @ViewChild('skarabeusSmoke') skarabeusSmoke:ElementRef;
  canvasWidth;
  canvasHeight;


  constructor(private router: Router, private _service: AuthenticationService, private _router: Router) {
    this.canvasHeight = 600;
  }

  ngOnInit() {
    // reset login status
    this._service.logout();
    this.user = new User();
  }

  ngAfterViewInit() {
    let canvas = this.skarabeusSmoke.nativeElement;
    this.canvasWidth = canvas.parentElement.clientWidth;
    console.log(canvas);
    let ctx:CanvasRenderingContext2D = this.skarabeusSmoke.nativeElement.getContext('2d');


    let party = smokemachine(canvas,ctx, [255,225,105]);
    party.start(); // start animating


    setInterval(() => {
      party.addsmoke(this.canvasWidth/ 2, this.canvasHeight, 3);
    }, 500);


  }

  login() {
    this._service.login(this.user)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/lobby']);
        } else {
          this.error = 'Username exists';
          this.loading = false;
        }
      });
  }

  clearfields() {
    this.user.username = '';
    let err = document.getElementById("error_msg");
    err.innerHTML = "";
  }


}
