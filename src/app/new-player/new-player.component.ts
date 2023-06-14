import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss'],
})
export class NewPlayerComponent {
  @Input() addNewItemText = '';
  @Input() addNewItemSrc = '';
  @Input() symbolPool: string[] = [];
  @Input() storePlayers: {
    playerName: string;
    playerSymbol: string;
    playerColor: string;
  }[] = [];

  // used to pick a random symbol from a defined pool
  private pickRandomSymbol(): string {
    return this.symbolPool[Math.floor(Math.random() * this.symbolPool.length)];
  }

  // used to generate a random hexa color
  private pickRandomColor(): string {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16); // generate random color (convertToHex(round(maxVal * randomNum)))
  }

  // used to create a new default player
  handleNewPlayerClick(): void {
    this.storePlayers.push({
      playerName: '',
      playerSymbol: this.pickRandomSymbol(), // generate random symbol
      playerColor: this.pickRandomColor(), // generate random color
    });
    console.log('players: ', this.storePlayers);
  }
}
