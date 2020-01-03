import { Component, Input } from '@angular/core';
import Player from '../models/player';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent {
  @Input() players: Player[];
}
