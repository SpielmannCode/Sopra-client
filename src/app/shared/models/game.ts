
export class Game {
  private _id:number;
  private _name:string;
  private _owner:string;
  private _status:string;
  private _currentPlayer:number;
  private _moves;
  private _players;
  private _playerCountSetting:number;

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get owner(): string {
    return this._owner;
  }

  set owner(value: string) {
    this._owner = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get currentPlayer(): number {
    return this._currentPlayer;
  }

  set currentPlayer(value: number) {
    this._currentPlayer = value;
  }

  get moves() {
    return this._moves;
  }

  set moves(value) {
    this._moves = value;
  }

  get players() {
    return this._players;
  }

  set players(value) {
    this._players = value;
  }

  get playerCountSetting(): number {
    return this._playerCountSetting;
  }

  set playerCountSetting(value: number) {
    this._playerCountSetting = value;
  }
}
