import {Injectable, isDevMode} from '@angular/core';

@Injectable()
export class ApiService {
  apiUrl: String;

  constructor() {

    if (isDevMode()) {
      this.apiUrl = 'http://localhost:8080';
    } else {
      this.apiUrl = 'https://sopra-fs17-group12.herokuapp.com';
    }
  }

}
