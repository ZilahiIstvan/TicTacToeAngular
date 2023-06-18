export interface Player {
  id: number;
  playerName: string;
  playerSymbol: string;
  playerColor: string;
  playerScore: number;
}

export interface Board {
  id: number;
  symbol: string;
  color: string;
  clicked: boolean;
  cellBgColor: string;
}
