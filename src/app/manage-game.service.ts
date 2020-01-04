import { Injectable } from "@angular/core";
import Cell from "./models/cell";
import Player from "./models/player";

@Injectable({
  providedIn: "root"
})
export class ManageGameService {
  constructor() {}

  getNextPlayer(players: Player[], currentPlayer: Player): Player {
    let player: Player;
    if (currentPlayer) {
      const currentIndex = players.indexOf(currentPlayer);
      const nextIndex = (currentIndex + 1) % players.length;
      player = players[nextIndex];
    } else {
      player = players[0];
    }
    return player;
  }

  hasWon(cells: Cell[], currentPlayer: Player): boolean {
    const size = Math.sqrt(cells.length);
    const cellsPlayedByCurrentPlayer = cells.filter(
      cell => cell.getPlayedByPlayerNumber() === currentPlayer.getId()
    );
    const sizeSameIndex = cellsPlayedByCurrentPlayer.filter(
      cell => cell.getLineIndex() === cell.getColumnIndex()
    ).length;
    const sizeSameInversedIndex = cellsPlayedByCurrentPlayer.filter(
      cell => cell.getLineIndex() + cell.getColumnIndex() === size - 1
    ).length;
    if (sizeSameIndex === size || sizeSameInversedIndex === size) {
      return true;
    }

    for (let i = 0; i < size; i++) {
      const sizeSameLineIndex = cellsPlayedByCurrentPlayer.filter(
        cell => cell.getLineIndex() === i
      ).length;
      const sizeSameColumnIndex = cellsPlayedByCurrentPlayer.filter(
        cell => cell.getColumnIndex() === i
      ).length;
      if (sizeSameLineIndex === size || sizeSameColumnIndex === size) {
        return true;
      }
    }

    return false;
  }

  numberCellsLeftToPlay(cells: Cell[]) {
    return cells.filter(cell => cell.getPlayedByPlayerNumber() === 0).length;
  }
}
