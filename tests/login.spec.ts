import { test, expect } from '@playwright/test';
import { loginData } from '../test data/login.data';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successfull login with correct credentials', async ({ page }) => {
    // Arrange
    const userLogin = loginData.loginId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessfull login with too short username', async ({ page }) => {
    //Arrange
    const userLogin = 'test';
    const expectedErrorForTooShortLogin = 'identyfikator ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('login-input').blur();

    //Asset
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorForTooShortLogin,
    );
  });

  test('unsuccessfull login with too short password', async ({ page }) => {
    //Arrange
    const incorrectUserLogin = loginData.loginId;
    const incorrectUserPassword = 'pas';
    const expectedErrorForTooShortPassword = 'hasło ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(incorrectUserLogin);
    await page.getByTestId('password-input').fill(incorrectUserPassword);
    await page.getByTestId('password-input').blur();

    //Asset
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorForTooShortPassword,
    );
  });
});
