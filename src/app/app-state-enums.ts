export enum AppStateEnum {
  // SCREENS
  StartScreen, // start screen
  LoginScreen, // login screen (start btn clicked)
  SettingsScreen, // settings screen (login was successful)
  GameScreen, // game screen (after start game button clicked)
  WinnerScreen, // winner screen
  LoginWrongDataAttempt, // was a login attempt, but with wrong data
  GameStartWrongName,
  GameStartWrongColor,
}

export enum BoardStateEnum {
  NoAction,
  LockBoard,
  ResetBoard,
  ResetPrevStep,
}
