import { Injectable, isDevMode } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {ApiService} from "./api.service";
import {Game} from "../models/game";

@Injectable()
export class UserService {
  headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
  options = new RequestOptions({ headers: this.headers });

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService,
    private apiService: ApiService) {
  }

  getUsers(): Observable<User[]> {

    // get users from api
    return this.http.get(this.apiService.apiUrl +'/users', this.options)
      .map((response: Response) => response.json());
  }
}

