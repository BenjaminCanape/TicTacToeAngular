import { Injectable } from "@angular/core";
import Cell from "./models/cell";
import Player from "./models/player";
import Level from "./models/level";

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

  cellToPlayByAI(cells: Cell[], level: string, currentPlayer: Player): Cell {
    const cellsNotPlayed = cells.filter(cell => cell.getPlayedByPlayerNumber() === 0);
    if (level === Level.EASY) {
      return cellsNotPlayed[Math.floor(Math.random() * cellsNotPlayed.length)];
    } else if (level === Level.MEDIUM) {
      const possibilies = this.calculateBestPossibiltiesToPlayForAI(cells, cellsNotPlayed, currentPlayer, level);
      return possibilies[0].cell;
    } else if (level === Level.HARD) {
      // goal: see if I can win
      const possibilies = this.calculateBestPossibiltiesToPlayForAI(cells, cellsNotPlayed, currentPlayer, level);
      return possibilies[0].cell;
    } else if (level === Level.EXTREME) {
      let possibiliesHard = this.calculateBestPossibiltiesToPlayForAI(cells, cellsNotPlayed, currentPlayer, Level.HARD);
      let possibiliesMedium = this.calculateBestPossibiltiesToPlayForAI(cells, cellsNotPlayed, currentPlayer, Level.MEDIUM);
      possibiliesHard.forEach((cell) => {
        cell.score *= 2;
        possibiliesMedium.filter(cellMedium => cellMedium.cell === cell.cell).forEach(cellMedium => cell.score += cellMedium.score);
      });
      possibiliesHard.sort((a, b) => {
        return b.score - a.score;
      });
      return possibiliesHard[0].cell;
    }
  }

  private calculateBestPossibiltiesToPlayForAI(cells: Cell[], cellsNotPlayed: Cell[], currentPlayer: Player, level: Level) {
    let possibilies = [];
    cellsNotPlayed.forEach((cell) => {
      let played;
      if (level === Level.HARD) {
        played = cells.filter(cellInFilter => (cellInFilter.getColumnIndex() === cell.getColumnIndex() || cellInFilter.getLineIndex() === cell.getLineIndex() || cellInFilter.getColumnIndex() === cell.getColumnIndex() - 1 || cellInFilter.getColumnIndex() === cell.getColumnIndex() + 1 || cellInFilter.getLineIndex() === cell.getLineIndex() - 1 || cellInFilter.getLineIndex() === cell.getLineIndex() + 1 ) && cellInFilter.getPlayedByPlayerNumber() === currentPlayer.getId());
      } else if (level === Level.MEDIUM) {
        played = cells.filter(cellInFilter => (cellInFilter.getColumnIndex() === cell.getColumnIndex() || cellInFilter.getLineIndex() === cell.getLineIndex() || cellInFilter.getColumnIndex() === cell.getColumnIndex() - 1 || cellInFilter.getColumnIndex() === cell.getColumnIndex() + 1 || cellInFilter.getLineIndex() === cell.getLineIndex() - 1 || cellInFilter.getLineIndex() === cell.getLineIndex() + 1 ) && cellInFilter.getPlayedByPlayerNumber() !== currentPlayer.getId() && cellInFilter.getPlayedByPlayerNumber() !== 0);
      }
      let notPlayed = cells.filter(cellInFilter => (cellInFilter.getColumnIndex() === cell.getColumnIndex() || cellInFilter.getLineIndex() === cell.getLineIndex() || cellInFilter.getColumnIndex() === cell.getColumnIndex() - 1 || cellInFilter.getColumnIndex() === cell.getColumnIndex() + 1 || cellInFilter.getLineIndex() === cell.getLineIndex() - 1 || cellInFilter.getLineIndex() === cell.getLineIndex() + 1 ) && cellInFilter.getPlayedByPlayerNumber() === 0);
      const score = played.length * 10 + notPlayed.length;
      possibilies.push({cell, score});
    });

    return possibilies
    .sort((a, b) =>  b.score - a.score)
    .filter((cell) => cell.score === possibilies[0].score)
    .map((cell) => ({sort: Math.random(), value: cell}))
    .sort((a, b) => a.sort - b.sort)
    .map((cell) => cell.value);
  }
}
