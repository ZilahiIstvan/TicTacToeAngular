import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  // inputs
  @Input() symbolPool: string[] = [];
  @Input() symbol: string = '';
  @Input() color: string = '#ffffff';
  @Input() id: number = -1;

  // outputs
  @Output() storePlayersSymbol = new EventEmitter<[number, string, string]>();
  @Output() storePlayersColor = new EventEmitter<[number, string, string]>();
  @Output() storePlayersName = new EventEmitter<[number, string, string]>();

  // used to emit an event if the player's symbol has been changed
  handlePlayerSymbolSelector(event: any) {
    this.storePlayersSymbol.emit([this.id, event.target.value, 'playerSymbol']);
  }

  // used to emit an event if the player's color has been changed
  handlePlayerColorSelector(event: any) {
    this.storePlayersColor.emit([this.id, event.target.value, 'playerColor']);
  }

  // used to emit an event if the player's name has been changed
  handlePlayerNameSelector(playerName: string) {
    this.storePlayersName.emit([this.id, playerName, 'playerName']);
  }
}
