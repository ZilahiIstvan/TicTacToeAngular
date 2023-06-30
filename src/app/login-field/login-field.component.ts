import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-field',
  templateUrl: './login-field.component.html',
  styleUrls: ['./login-field.component.scss'],
})
export class LoginFieldComponent {
  // inputs
  @Input() loginFieldPlaceholder: string = '';
  @Input() loginFieldIconSrc: string = '';
  @Input() loginFieldType: string = '';
  @Input() loginFieldWidth: number = 0;

  // outputs
  @Output() userEventLogin = new EventEmitter<string>();

  // changeable variables
  loginFieldState: boolean = false; // false: blured, true: focused
  loginFieldValue: string = ''; // store field value string

  // used to set the focused state
  public loginFieldFocused = (): void => {
    this.loginFieldState = true;
  };

  // used to set the blured state
  public loginFieldBlured = (): void => {
    this.loginFieldState = false;
  };

  // used to set the login field to empty character
  public resetLoginFieldValue(): void {
    this.loginFieldValue = '';
  }

  // used to send back the user provided input data to the parent component
  public handleUserEventLogin(event: any): void {
    this.loginFieldValue = event.target.value;
    this.userEventLogin.emit(this.loginFieldValue);
  }

  // styles
  // used to set the width of the login-field
  public setLoginFieldWidth() {
    return {
      width: `${this.loginFieldWidth}rem`,
    };
  }
}
