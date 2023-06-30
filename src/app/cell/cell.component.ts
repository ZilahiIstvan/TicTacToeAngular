import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  // inputs
  @Input() cellText: string = ''; // text of the cell
  @Input() cellIdx: number = -1; // index of the cell
  @Input() cellColor: string = ''; // text color of the cell
  @Input() cellClicked: boolean = false; // store if the cell already clicked
  @Input() cellBgColor: string = '';
  @Input() updatePlayerIdxFunc: (cellIdx: number) => [string, string] = () => {
    return ['', ''];
  }; // input func for updating the player index

  // used to determine the text and color of a clicked cell
  handleCellClick() {
    if (!this.cellClicked) {
      this.cellClicked = true;
      [this.cellText, this.cellColor] = this.updatePlayerIdxFunc(this.cellIdx);
    }
  }

  // styles
  // used to set the font and background colors of the cell
  public setBoardCellStyle() {
    return {
      color: `${this.cellColor}`,
      backgroundColor: `${this.cellBgColor}`,
    };
  }
}
