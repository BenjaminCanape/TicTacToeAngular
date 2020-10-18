import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";

import { AppComponent } from "./app.component";
import { BoardComponent } from "./board/board.component";
import { CellComponent } from "./cell/cell.component";
import { ScoreBoardComponent } from "./score-board/score-board.component";
import { StartMenuComponent } from "./start-menu/start-menu.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDivider, MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PlayerFormComponent } from "./player-form/player-form.component";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    ScoreBoardComponent,
    PlayerFormComponent,
    StartMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule,
    FormsModule,
    MatInputModule,
    MatExpansionModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
