import { Component, Input, OnInit } from "@angular/core";
import Player from "../models/player";

@Component({
  selector: "app-player-form",
  templateUrl: "./player-form.component.html",
  styleUrls: ["./player-form.component.css"]
})
export class PlayerFormComponent implements OnInit {
  @Input() players: Player[];
  constructor() {}

  ngOnInit() {}
}
