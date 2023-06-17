import { Component, ViewChildren, QueryList } from '@angular/core';
import { loginData } from './login-data';
import { AppStateEnum } from './app-state-enums';
import { LoginFieldComponent } from './login-field/login-field.component';
import { player1DefColor, player2DefColor } from './app-styles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChildren(LoginFieldComponent)
  loginFieldComp: QueryList<LoginFieldComponent> =
    new QueryList<LoginFieldComponent>(); // query all instances of the loginFieldComponent components

  appStateEnum = AppStateEnum; // define enum
  loginData: { user: string; pass: string } = loginData; // store login data (username, password)
  appState: AppStateEnum = AppStateEnum.StartScreen; // init app state
  userProvidedUsername: string = ''; // stores the username from the user
  userProvidedPassword: string = ''; // stores the paswword from the user
  symbolPool: string[] = ['X', 'O', 'A', 'B']; // stores the possible symbols
  maxPlayerCnt: number = 6; // determines the maximum number of players
  storePlayers: {
    id: number;
    playerName: string;
    playerSymbol: string;
    playerColor: string;
  }[] = [
    {
      id: 0,
      playerName: '',
      playerSymbol: 'X',
      playerColor: player1DefColor,
    },
    { id: 1, playerName: '', playerSymbol: 'O', playerColor: player2DefColor },
  ]; // stores the players' data

  playerSymbols: string[] = [];
  playerColors: string[] = [];
  playerNames: string[] = [];
  boardSize: number = 5;

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

  public handleStartGameBtnClick(state: AppStateEnum): void {
    let arrSize: number = this.storePlayers.length;

    for (let i = 0; i < arrSize; i++) {
      // check if player name is empty
      if (this.storePlayers[i].playerName != '') {
        // check the players (name, color and symbol is okay)
      }
      this.appState = AppStateEnum.GameStartWrongName;
    }

    // game can be started
    this.appState = state;
    this.storePlayers.forEach((element) => {
      this.playerSymbols.push(element.playerSymbol);
      this.playerColors.push(element.playerColor);
      this.playerNames.push(element.playerName);
    });
  }

  // used to handle the player symbol and color attributes change
  public setStorePlayersAttributes(values: [number, string, string]) {
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
    console.log(this.storePlayers);
  }

  public setBoardSize(size: number) {
    this.boardSize = size;
  }
}
