import { Component, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { loginData } from './login-data';
import { AppStateEnum, BoardStateEnum } from './app-state-enums';
import { LoginFieldComponent } from './login-field/login-field.component';
import { BoardComponent } from './board/board.component';
import { player1DefColor, player2DefColor } from './app-styles';
import { Player } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChildren(LoginFieldComponent)
  loginFieldComp: QueryList<LoginFieldComponent> =
    new QueryList<LoginFieldComponent>(); // query all instances of the loginFieldComponent components
  @ViewChildren(BoardComponent) boardComp: QueryList<BoardComponent> =
    new QueryList<BoardComponent>();

  appStateEnum = AppStateEnum; // define enum
  loginData: { user: string; pass: string } = loginData; // store login data (username, password)
  appState: AppStateEnum = AppStateEnum.StartScreen; // init app state
  userProvidedUsername: string = ''; // stores the username from the user
  userProvidedPassword: string = ''; // stores the paswword from the user
  symbolPool: string[] = ['X', 'O', 'A', 'B']; // stores the possible symbols
  maxPlayerCnt: number = 6; // determines the maximum number of players
  storePlayers: Player[] = [
    {
      id: 0,
      playerName: '',
      playerSymbol: 'X',
      playerColor: player1DefColor,
      playerScore: 0,
    },
    {
      id: 1,
      playerName: '',
      playerSymbol: 'O',
      playerColor: player2DefColor,
      playerScore: 0,
    },
  ]; // stores the players' data

  playerSymbols: string[] = [];
  playerColors: string[] = [];
  boardSize: number = 5;
  winnerName: string = '';
  errorMsg: string = 'defaultText';

  // used to sort the players array based on the players' score
  private sortPlayersBasedOnPoints = () => {
    this.storePlayers = this.storePlayers.sort((el, el1) => {
      if (el.playerScore > el1.playerScore) return -1;
      else if (el.playerScore < el1.playerScore) return 1;
      return 0;
    });
  };

  // used to switch the app state based on the parameter
  public changeAppState(state: AppStateEnum): void {
    this.appState = state;
  }

  // used to store the user provided username
  public handleUserProvidedUsername(username: string): void {
    this.userProvidedUsername = username;
  }

  // used to store the user provided password
  public handleUserProvidedPassword(password: string): void {
    this.userProvidedPassword = password;
  }

  // used to compare the porvided login data when the login btn clicked
  public handleLoginBtnClicked(): void {
    if (
      this.userProvidedUsername == loginData.user &&
      this.userProvidedPassword == loginData.pass
    ) {
      console.log('Login'); // for testing
      this.appState = AppStateEnum.SettingsScreen;
    } else {
      console.log('Wrong username or password'); // for testing
      this.appState = AppStateEnum.LoginWrongDataAttempt;
    }
    this.loginFieldComp.forEach((childComponent) => {
      childComponent.resetLoginFieldValue(); // set all instances value to "" (clear the field)
    });
  }

  // used to check the players' data and start the game
  public handleStartGameBtnClick(state: AppStateEnum): void {
    let arrSize: number = this.storePlayers.length;
    let colors: string[] = [];
    let errorFound: boolean = false; // indicates if error found or not

    for (let i = 0; i < arrSize; i++) {
      // check if player name is empty
      if (this.storePlayers[i].playerName == '') {
        // check the name of the players
        this.appState = AppStateEnum.GameStartWrongName;
        this.errorMsg = `Name hasn't been provided.`;
        errorFound = true; // name error has been found
        break;
      } else {
        colors.push(this.storePlayers[i].playerColor); // player name is okay, store color
      }
    }

    if (!errorFound) {
      let uniqueColorsNum: number = new Set(colors).size; // get the number of the unique colors

      if (uniqueColorsNum != colors.length) {
        // if there is a similar color
        this.appState = AppStateEnum.GameStartWrongColor;
        this.errorMsg = 'Colors are similar. Please select another one.';
        errorFound = true; // color error has been found
      } else {
        if (!errorFound) {
          // game can be started (colors are unique and names are filled out)
          this.appState = state; // set input state
          this.storePlayers.forEach((element) => {
            this.playerSymbols.push(element.playerSymbol);
            this.playerColors.push(element.playerColor);
          }); // store symbols and colors
        }
      }
    }
  }

  // used to handle the player symbol and color attributes change
  public setStorePlayersAttributes(values: [number, string, string]): void {
    // loop trough store players and modify the player which selected by id
    this.storePlayers.map((item) => {
      if (item.id === values[0]) {
        let itemObj = item;
        if (values[2] === 'playerSymbol') {
          itemObj['playerSymbol'] = values[1]; // change playerSymbol
        } else if (values[2] === 'playerColor') {
          itemObj['playerColor'] = values[1]; // change playerColor
        } else if (values[2] === 'playerName') {
          itemObj['playerName'] = values[1]; // change playerName
        }
        return itemObj;
      }
      return item;
    });
  }

  // used to set the board size
  public setBoardSize(size: number): void {
    this.boardSize = size;
  }

  // used to increase the winner's point and sort the players array
  public setWinnerPoint(values: [string, string]): void {
    this.storePlayers.forEach((item) => {
      // find winner based on symbol and color
      if (item.playerSymbol === values[0] && item.playerColor == values[1]) {
        let itemObj = item;
        itemObj.playerScore += 1; // increase winner point
        this.winnerName = itemObj.playerName; // store winner name
        return itemObj;
      } else {
        return item;
      }
    });
    this.sortPlayersBasedOnPoints(); // sort array for displaying it in the right order
  }

  public handleRestartBtnClick(): void {
    this.boardComp.forEach((item) =>
      item.setBoardAttributes(BoardStateEnum.ResetBoard)
    );
    this.appState = AppStateEnum.GameScreen;
  }

  public handleQuitBtnClick(): void {
    this.boardComp.forEach((item) =>
      item.setBoardAttributes(BoardStateEnum.ResetBoard)
    );
    this.appState = AppStateEnum.StartScreen;
  }
}
