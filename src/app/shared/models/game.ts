import {User} from "./user";

export class Game {
  private _numberOfPlayers:number;
  private _isRunning:boolean;
  public _name:string;
  private _host:User;

  constructor(_name, _isRunning, _numberOfPlayers){
    this._name = _name;
    this._isRunning = _isRunning;
    this._numberOfPlayers = _numberOfPlayers;
  }

  get numberOfPlayers(): number {
    return this._numberOfPlayers;
  }

  set numberOfPlayers(value: number) {
    this._numberOfPlayers = value;
  }

  get isRunning(): boolean {
    return this._isRunning;
  }

  set isRunning(value: boolean) {
    this._isRunning = value;
  }

  get host(): User {
    return this._host;
  }

  set host(value: User) {
    this._host = value;
  }
}
