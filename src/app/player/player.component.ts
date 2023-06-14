import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Input() symbolPool: string[] = [];
  @Input() symbol: string = '';
  @Input() color: string = '#ffffff';
}
