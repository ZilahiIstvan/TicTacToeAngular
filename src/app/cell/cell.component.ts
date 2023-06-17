import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  @Input() cellText: string = ''; // text of the cell
  @Input() cellIdx: number = -1; // index of the cell
  @Input() cellColor: string = ''; // text color of the cell
  @Input() cellClicked: boolean = false; // store if the cell already clicked
  @Input() cellBgColor: string = '';
  @Input() updatePlayerIdxFunc: (cellIdx: number) => [string, string] = () => {
    return ['', ''];
  }; // input func for updating the player index

  public setBoardCellStyle() {
    return {
      color: `${this.cellColor}`,
      backgroundColor: `${this.cellBgColor}`,
    };
  }

  handleCellClick() {
    if (!this.cellClicked) {
      this.cellClicked = true;
      [this.cellText, this.cellColor] = this.updatePlayerIdxFunc(this.cellIdx);
    }
  }
}
