import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import Cell from "../models/cell";
import Player from "../models/player";

@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnInit {
  @Input() lineIndex: number;
  @Input() columnIndex: number;
  @Input() currentPlayer: Player;
  @Output() cellAdded: EventEmitter<any> = new EventEmitter();
  @Output() cellPlayed: EventEmitter<any> = new EventEmitter();
  cell: Cell;
  hasBeenPlayed = false;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.cell = new Cell(this.lineIndex, this.columnIndex, 0);
    this.cellAdded.emit(this.cell);
  }

  handleClick() {
    this.hasBeenPlayed = true;
    this.changeDetector.detectChanges();
    this.cellPlayed.emit(this.cell);
    this.changeDetector.detach();
  }

  reset() {
    this.hasBeenPlayed = false;
    this.cell.setPlayedByPlayerNumber(0);
  }
}
