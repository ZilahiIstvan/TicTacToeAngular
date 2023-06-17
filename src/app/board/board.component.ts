import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { AppStateEnum, BoardStateEnum } from '../app-state-enums';
import { CellComponent } from '../cell/cell.component';
import { cellBgColor } from '../app-styles';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @ViewChildren(CellComponent)
  cellComps: QueryList<CellComponent> = new QueryList<CellComponent>(); // query all instances of the loginFieldComponent components
  // inputs
  @Input() boardSize: number = 0;
  @Input()
  playerSymbols: string[] = ['X', 'O', 'A', 'B'];
  @Input()
  playerColors: string[] = [];

  @Output() appState = new EventEmitter<AppStateEnum>();

  // vairables
  public board: {
    id: number;
    symbol: string;
    color: string;
    clicked: boolean;
    cellBgColor: string;
  }[][] = []; // create empty array
  private playerIdx: number = 0; // player symbol index
  private winnerSymbolsCnt: number = 5; // number of the winner symbols
  private directions: number[][] = [
    [0, -1],
    [1, 0],
    [-1, -1],
    [-1, 1],
  ];
  private inverseDirections: number[][] = [
    [0, 1],
    [-1, 0],
    [1, 1],
    [1, -1],
  ];
  boardStateEnum = BoardStateEnum; // define enum

  ngOnInit() {
    this.fillBoardArr(); // fill array with init values
  }

  // used to create an empty array
  private fillBoardArr(): void {
    let idx: number = 0;

    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i][j] = {
          id: idx,
          symbol: '',
          color: '',
          clicked: false,
          cellBgColor: '',
        };
        idx += 1;
      }
    }
  }

  // TODO: REWORK THIS
  public setBoardAttributes(boardState: BoardStateEnum) {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (boardState === BoardStateEnum.LockBoard) {
          this.board[i][j].clicked = true;
        } else if (boardState === BoardStateEnum.ResetBoard) {
          this.board[i][j].clicked = false;
          this.board[i][j].symbol = '';
          this.board[i][j].cellBgColor = '';
          //console.log(this.board);
          this.cellComps.forEach((cell) => {
            cell.cellClicked = false;
            cell.cellText = '';
            cell.cellBgColor = '';
          });
        } else if (boardState === BoardStateEnum.ResetPrevStep) {
          this.board[i][j].cellBgColor = '';
          this.cellComps.forEach((cell) => {
            cell.cellBgColor = '';
          });
        }
      }
    }
  }

  // used to check the winner
  public checkWinner(cellId: number): boolean {
    let row = Math.floor(cellId / this.boardSize);
    let col = cellId % this.boardSize;
    let playerSymbol: string = this.board[row][col].symbol;
    let playerColor: string = this.board[row][col].color;

    //checking the four directions [(left-right, up-down, left to right diagonal, right to left diagonal)]
    for (let i = 0; i < 4; i++) {
      let currentRow = row;
      let currentCol = col; // init

      // shift the original value
      for (let step = 0; step < this.winnerSymbolsCnt; step++) {
        let symbolCnt = 0;
        currentRow = row + this.directions[i][0] * step;
        currentCol = col + this.directions[i][1] * step;
        // check if currentRow and currentCol are in the board range
        if (
          currentRow >= 0 &&
          currentRow < this.boardSize &&
          currentCol >= 0 &&
          currentCol < this.boardSize
        ) {
          let tempRow = 0;
          let tempCol = 0;
          for (let k = 0; k < this.winnerSymbolsCnt; k++) {
            tempRow = currentRow + this.inverseDirections[i][0] * k;
            tempCol = currentCol + this.inverseDirections[i][1] * k;
            // check if tempRow and tempCol are in the board range and symbol is the same
            if (
              tempRow >= 0 &&
              tempRow < this.boardSize &&
              tempCol >= 0 &&
              tempCol < this.boardSize &&
              playerSymbol === this.board[tempRow][tempCol].symbol &&
              playerColor === this.board[tempRow][tempCol].color
            ) {
              symbolCnt++; // increase the found similar symbols
            } else {
              break;
            }
          }
        } else {
          break;
        }
        if (symbolCnt === this.winnerSymbolsCnt) {
          this.appState.emit(AppStateEnum.WinnerScreen); // winner found
          this.setBoardAttributes(BoardStateEnum.LockBoard);
          return true;
        }
        symbolCnt = 0; // reset counter
      }
    }
    this.appState.emit(AppStateEnum.GameScreen); // there is no winner
    return false;
  }

  // used to set the grid template dynamically based on the board size
  public setGameBoardStyle() {
    return {
      gridTemplateColumns: `repeat(${this.boardSize}, 3rem)`,
      gridTemplateRows: `repeat(${this.boardSize}, 3rem)`,
      fontSize: '2rem',
    };
  }

  public updatePlayerIdx = (cellId: number): [string, string] => {
    if (this.playerIdx === this.playerSymbols.length) {
      this.playerIdx = 0; // reset idx
    }
    let symbol = this.playerSymbols[this.playerIdx];
    let color = this.playerColors[this.playerIdx];
    this.playerIdx += 1;

    let row = Math.floor(cellId / this.boardSize);
    let col = cellId % this.boardSize;
    this.board[row][col].symbol = symbol;
    this.board[row][col].color = color;

    this.setBoardAttributes(BoardStateEnum.ResetPrevStep);
    this.board[row][col].cellBgColor = cellBgColor;

    this.checkWinner(cellId);

    return [symbol, color];
  };
}
