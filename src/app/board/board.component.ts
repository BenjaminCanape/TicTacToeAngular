import { Component, OnInit, Input, ViewChildren, QueryList } from "@angular/core";
import Cell from '../models/cell';
import Player from '../models/player';
import { CellComponent } from '../cell/cell.component';
import { ManageGameService } from '../manage-game.service';

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit {
  @ViewChildren(CellComponent) cellComponents: QueryList<CellComponent>;
  @Input() size: number;
  currentPlayer: Player = null;
  players: Player[] = [];
  cells: Cell[] = [];
  gameEnded: boolean = false;
  draw: boolean = false;

  constructor(private manageGameService: ManageGameService) { }

  ngOnInit() {
    let player1 = new Player(1, "player 1", "X");
    let player2 = new Player(2, "player 2", "O")
    this.players.push(player1);
    this.players.push(player2);
    this.currentPlayer = this.manageGameService.getNextPlayer(this.players, this.currentPlayer);
  }

  addCellToBoard(cell) {
    this.cells.push(cell);
  }

  cellPlayed(cell) {
    let currentCell = this.cells.find(currentCell => currentCell.getLineIndex() == cell.getLineIndex() && currentCell.getColumnIndex() == cell.getColumnIndex())
    currentCell.setPlayedByPlayerNumber(this.currentPlayer.getId());
    this.manageGame();
  }

  noCellsToPlay() {
    let cellsToPlayNumber = this.manageGameService.numberCellsLeftToPlay(this.cells);

    if (!cellsToPlayNumber) {
      this.draw = true;
      return true;
    }

    return false;
  }

  manageGame() {
    let hasWon = this.manageGameService.hasWon(this.cells, this.currentPlayer);
    if (hasWon) {
      this.currentPlayer.addToScore(1);
    }
    this.gameEnded = hasWon || this.noCellsToPlay();
    if (!this.gameEnded) {
      this.currentPlayer = this.manageGameService.getNextPlayer(this.players, this.currentPlayer);
    }
  }

  restart() {
    this.currentPlayer = this.players[0];
    this.draw = false;
    this.gameEnded = false;
    this.cells = [];
    this.cellComponents.forEach(component => component.reset());
  }
}
