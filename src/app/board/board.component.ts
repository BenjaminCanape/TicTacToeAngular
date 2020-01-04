import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import Cell from "../models/cell";
import Player from "../models/player";
import { CellComponent } from "../cell/cell.component";
import { ManageGameService } from "../manage-game.service";

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
  gameEnded = false;
  draw = false;

  constructor(
    private manageGameService: ManageGameService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const player1 = new Player(1, "player 1", "X");
    const player2 = new Player(2, "player 2", "O");
    this.players.push(player1);
    this.players.push(player2);
    this.currentPlayer = this.manageGameService.getNextPlayer(
      this.players,
      this.currentPlayer
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  addCellToBoard(cell) {
    this.cells.push(cell);
  }

  cellPlayed(cell) {
    const cellPlayed = this.cells.find(
      currentCell =>
        currentCell.getLineIndex() === cell.getLineIndex() &&
        currentCell.getColumnIndex() === cell.getColumnIndex()
    );
    cellPlayed.setPlayedByPlayerNumber(this.currentPlayer.getId());
    this.manageGame();
  }

  noCellsToPlay() {
    const cellsToPlayNumber = this.manageGameService.numberCellsLeftToPlay(
      this.cells
    );

    if (!cellsToPlayNumber) {
      this.draw = true;
      return true;
    }

    return false;
  }

  manageGame() {
    const hasWon = this.manageGameService.hasWon(
      this.cells,
      this.currentPlayer
    );
    if (hasWon) {
      this.currentPlayer.addToScore(1);
    }
    this.gameEnded = hasWon || this.noCellsToPlay();
    if (!this.gameEnded) {
      this.currentPlayer = this.manageGameService.getNextPlayer(
        this.players,
        this.currentPlayer
      );

      this.openSnackBar(
        "Au tour de " + this.currentPlayer.getSurname() + " de jouer",
        ""
      );
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
