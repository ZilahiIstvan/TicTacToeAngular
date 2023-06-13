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

  // outputs
  @Output() userEventLogin = new EventEmitter<string>();

  // variables
  loginFieldState: boolean = false; // false: blured, true: focused
  loginFieldValue: string = ''; // store field value string

  // used to set the focused state
  loginFieldFocused = (): void => {
    this.loginFieldState = true;
  };

  // used to set the blured state
  loginFieldBlured = (): void => {
    this.loginFieldState = false;
  };

  resetLoginFieldValue() {
    this.loginFieldValue = '';
  }

  // used to send back the user provided input data to the parent component
  handleUserEventLogin(event: any): void {
    this.loginFieldValue = event.target.value;
    this.userEventLogin.emit(this.loginFieldValue);
  }
}
