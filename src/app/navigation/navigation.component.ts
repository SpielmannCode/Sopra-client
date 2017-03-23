import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";
import {User} from "../shared/models/user";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentUser;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  logout() {
    this.authService.logout();
    return false;
  }

}
