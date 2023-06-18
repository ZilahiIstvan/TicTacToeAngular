import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFieldComponent } from './login-field/login-field.component';
import { ButtonComponent } from './button/button.component';
import { RangeSelectorComponent } from './range-selector/range-selector.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { PlayerComponent } from './player/player.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { PlayerScoreComponent } from './player-score/player-score.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFieldComponent,
    ButtonComponent,
    RangeSelectorComponent,
    NewPlayerComponent,
    PlayerComponent,
    BoardComponent,
    CellComponent,
    PlayerScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
