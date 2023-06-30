import { Component, Input } from '@angular/core';
import { Player } from '../interfaces';

@Component({
  selector: 'app-player-score',
  templateUrl: './player-score.component.html',
  styleUrls: ['./player-score.component.scss'],
})
export class PlayerScoreComponent {
  // inputs
  @Input() storePlayers: Player[] = [];
}
