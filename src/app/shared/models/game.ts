
export class Game {

  private _id:number;
  private _name:string;
  private _owner:string;
  private _status:string;
  private _currentPlayerIndex:number;
  private _nextPlayerIndex:number;
  private _moves;
  private _players;
  private _playerCountSetting:number;
  private _gameBoard;

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

  get currentPlayerIndex(): number {
    return this._currentPlayerIndex;
  }

  set currentPlayerIndex(value: number) {
    this._currentPlayerIndex = value;
  }
  get nextPlayerIndex(): number {
    return this._nextPlayerIndex;
  }

  set nextPlayerIndex(value: number) {
    this._nextPlayerIndex = value;
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

  get gameBoard() {
    return this._gameBoard;
  }

  set gameBoard(value) {
    this._gameBoard = value;
  }
}
