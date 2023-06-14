import { Component, ViewChildren, QueryList } from '@angular/core';
import { loginData } from './login-data';
import { AppStateEnum } from './app-state-enums';
import { LoginFieldComponent } from './login-field/login-field.component';

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
  symbolPool: string[] = ['X', 'O']; // stores the possible symbols
  maxPlayerCnt: number = 6; // determines the maximum number of players
  storePlayers: {
    playerName: string;
    playerSymbol: string;
    playerColor: string;
  }[] = [
    { playerName: '', playerSymbol: 'X', playerColor: '#31c4be' },
    { playerName: '', playerSymbol: 'O', playerColor: '#f4e056' },
  ]; // stores the players' data

  // used to switch the app state to login when the start btn has been clicked
  handleStartBtnClicked(): void {
    this.appState = AppStateEnum.LoginScreen;
  }

  // used to store the user provided username
  handleUserProvidedUsername(username: string): void {
    this.userProvidedUsername = username;
  }

  // used to store the user provided password
  handleUserProvidedPassword(password: string): void {
    this.userProvidedPassword = password;
  }

  // used to compare the porvided login data when the login btn clicked
  handleLoginBtnClicked(): void {
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
}
