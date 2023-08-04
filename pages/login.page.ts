import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  logiInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');

  // login(loginId, userPassword){
  //     this.logiInput.fill(loginId);
  //     this.passwordInput.fill(userPassword);
  //     this.loginButton.click();
  // }
}
