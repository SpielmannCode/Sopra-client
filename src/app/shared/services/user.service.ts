import { Injectable, isDevMode } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {ApiService} from "./api.service";

@Injectable()
export class UserService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService,
    private apiService: ApiService) {
  }

  getUsers(): Observable<User[]> {
    // add authorization header with token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http.get(this.apiService.apiUrl +'/users', options)
      .map((response: Response) => response.json());
  }
}

