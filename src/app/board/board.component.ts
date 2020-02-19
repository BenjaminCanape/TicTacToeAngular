import { Subscription } from "rxjs";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterContentInit
} from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";
import { MatGridList } from "@angular/material";
import Cell from "../models/cell";
import Player from "../models/player";
import { CellComponent } from "../cell/cell.component";
import { ManageGameService } from "../manage-game.service";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild("grid", { static: true }) grid: MatGridList;
  @ViewChildren(CellComponent) cellComponents: QueryList<CellComponent>;
  @Input() size: number;
  watcher: Subscription;
  currentPlayer: Player = null;
  players: Player[] = [];
  cells: Cell[] = [];
  gameEnded = false;
  draw = false;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 4,
    sm: 2,
    xs: 2
  };

  constructor(
    private manageGameService: ManageGameService,
    private snackBar: MatSnackBar,
    private mediaObserver: MediaObserver
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

  ngAfterContentInit() {
    this.watcher = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        this.grid.cols = this.gridByBreakpoint[change.mqAlias];
      }
    );
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
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
