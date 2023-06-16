import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  @Input() cellText: string = '';
  @Input() cellIdx: number = -1;
  @Input() cellColor: string = '';
  @Input() cellClicked: boolean = false;
  @Input() updatePlayerIdxFunc: (cellIdx: number) => [string, string] = () => {
    return ['', ''];
  };

  public setBoardCellStyle() {
    return {
      color: `${this.cellColor}`,
    };
  }

  handleCellClick() {
    if (!this.cellClicked) {
      //this.cellText = this.nextSymbol;
      this.cellClicked = true;
      [this.cellText, this.cellColor] = this.updatePlayerIdxFunc(this.cellIdx);
      console.log(this.cellText);
      console.log(this.cellColor);
    }
  }
}
