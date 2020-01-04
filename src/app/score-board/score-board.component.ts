import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Player from "../models/player";

@Component({
  selector: "app-score-board",
  templateUrl: "./score-board.component.html",
  styleUrls: ["./score-board.component.css"]
})
export class ScoreBoardComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() players: Player[];
  displayedColumns: string[] = ["symbol", "surname", "score"];
  dataSource: any;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.players);
    this.dataSource.sort = this.sort;
  }
}
