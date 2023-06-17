import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Input() symbolPool: string[] = [];
  @Input() symbol: string = '';
  @Input() color: string = '#ffffff';
  @Input() id: number = -1;

  @Output() storePlayersSymbol = new EventEmitter<[number, string, string]>();
  @Output() storePlayersColor = new EventEmitter<[number, string, string]>();
  @Output() storePlayersName = new EventEmitter<[number, string, string]>();

  handlePlayerSymbolSelector(event: any) {
    this.storePlayersSymbol.emit([this.id, event.target.value, 'playerSymbol']);
  }

  handlePlayerColorSelector(event: any) {
    this.storePlayersColor.emit([this.id, event.target.value, 'playerColor']);
  }

  handlePlayerNameSelector(event: any) {
    this.storePlayersName.emit([this.id, event.target.value, 'playerName']);
    console.log('emit');
  }
}
