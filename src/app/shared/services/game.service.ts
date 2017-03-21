import {Injectable, isDevMode} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Game} from "../models/game";
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable()
export class GameService {

  constructor(private http: Http,
              private apiService: ApiService) {


  }

  getGames(): Observable<Game[]> {
    // add authorization header with token

    // get  from api
    return this.http.get(this.apiService.apiUrl +'/games')
      .map((response: Response) => response.json());
  }

}
