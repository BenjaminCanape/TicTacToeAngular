export default class Player {
  private id: number;
  private surname: string;
  private score: number;
  private symbol: string;
  private canEditName: boolean;

  constructor(id: number, surname: string, symbol: string, canEditName: boolean = true) {
    this.id = id;
    this.surname = surname;
    this.symbol = symbol;
    this.score = 0;
    this.canEditName = canEditName;
  }

  getId() {
    return this.id;
  }

  setSurname(surname: string) {
    this.surname = surname;
  }

  getSurname() {
    return this.surname;
  }

  getScore() {
    return this.score;
  }

  addToScore(score: number) {
    this.score += score;
  }

  resetScore() {
    this.score = 0;
  }

  setSymbol(symbol: string) {
    this.symbol = symbol;
  }

  getSymbol() {
    return this.symbol;
  }

  setCandEditName(canEditName: boolean) {
    this.canEditName = canEditName;
  }

  getCanEditName() {
    return this.canEditName;
  }
}
