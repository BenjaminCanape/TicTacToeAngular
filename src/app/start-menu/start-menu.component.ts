import {
  Component,
  OnInit
} from "@angular/core";
import Level from "../models/level";

@Component({
  selector: "app-start-menu",
  templateUrl: "./start-menu.component.html",
  styleUrls: ["./start-menu.component.css"]
})
export class StartMenuComponent implements OnInit {
  boardSize = 3;
  level = "";
  LevelEnum = Level;

  ngOnInit() {
  }

  chooseLevel(value: string) {
    console.log(this);
    this.level = value;
  }
}
