import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './lobby-header.component.html',
  styleUrls: ['./lobby-header.component.css']
})
export class LobbyHeaderComponent implements OnInit {

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
