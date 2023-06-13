import { Component, ViewChildren, QueryList } from '@angular/core';
import { loginData } from './login-data';
import { LoginEnum } from './login-enum';
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

  startBtnFlag: boolean = false;
  loginData: { user: string; pass: string } = loginData;
  loginAuthentication: LoginEnum = LoginEnum.NoAttempt;

  userProvidedUsername: string = '';
  userProvidedPassword: string = '';

  handleStartBtnClicked(): void {
    this.startBtnFlag = true;
  }

  handleUserProvidedUsername(username: string): void {
    this.userProvidedUsername = username;
  }

  handleUserProvidedPassword(password: string): void {
    this.userProvidedPassword = password;
  }

  handleLoginBtnClicked(): void {
    if (
      this.userProvidedUsername == loginData.user &&
      this.userProvidedPassword == loginData.pass
    ) {
      console.log('Login');
      this.loginAuthentication = LoginEnum.Successful;
    } else {
      console.log('Wrong username or password');
      this.loginAuthentication = LoginEnum.WrongData;
    }
    this.loginFieldComp.forEach((childComponent) => {
      childComponent.resetLoginFieldValue(); // set all instances value to "" (clear the field)
    });
  }
}
