import {Injectable, isDevMode} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";

@Injectable()
export class ApiService {
  apiUrl: String;
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor() {

    if (isDevMode()) {
      this.apiUrl = 'http://localhost:8080';
    } else {
      this.apiUrl = 'https://sopra-fs17-group12.herokuapp.com';
    }
  }

}
