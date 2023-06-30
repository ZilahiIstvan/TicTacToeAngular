import { Component, Input } from '@angular/core';
import { maxColorVal } from '../app-styles';
import { Player } from '../interfaces';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss'],
})
export class NewPlayerComponent {
  // inputs
  @Input() addNewItemText: string = '';
  @Input() addNewItemSrc: string = '';
  @Input() symbolPool: string[] = [];
  @Input() storePlayers: Player[] = [];

  // used to pick a random symbol from a defined pool
  private pickRandomSymbol(): string {
    return this.symbolPool[Math.floor(Math.random() * this.symbolPool.length)];
  }

  // used to generate a random hexa color
  private pickRandomColor(): string {
    return '#' + Math.floor(Math.random() * maxColorVal).toString(16); // generate random color (convertToHex(round(maxVal * randomNum)))
  }

  // used to create a new default player
  public handleNewPlayerClick(): void {
    this.storePlayers.push({
      id: this.storePlayers.length,
      playerName: '',
      playerSymbol: this.pickRandomSymbol(), // generate random symbol
      playerColor: this.pickRandomColor(), // generate random color
      playerScore: 0,
    });
    console.log('players: ', this.storePlayers);
  }
}
