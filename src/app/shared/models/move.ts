
export class Move{
  private _type:string;
  private _id:number;
  private _failed:boolean;
  private _description:string;
  private _userID:number;
  private _stoneIndex:number;
  private _shipIndex:number;

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get failed(): boolean {
    return this._failed;
  }

  set failed(value: boolean) {
    this._failed = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get userID(): number {
    return this._userID;
  }

  set userID(value: number) {
    this._userID = value;
  }

  get stoneIndex(): number {
    return this._stoneIndex;
  }

  set stoneIndex(value: number) {
    this._stoneIndex = value;
  }

  get shipIndex(): number {
    return this._shipIndex;
  }

  set shipIndex(value: number) {
    this._shipIndex = value;
  }
}
