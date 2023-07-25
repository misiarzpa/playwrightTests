import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  const url = 'https://demo-bank.vercel.app/';

  test('successfull login with correct credentials', async ({ page }) => {
    // Arrange
    const userLogin = 'demotest';
    const userPassword = 'lalalla6';
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessfull login with too short username', async ({ page }) => {
    const userLogin = 'test';
    const expectedErrorForTooShortLogin = 'identyfikator ma min. 8 znaków';
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('login-input').blur();

    await expect(page.getByTestId('error-login-id')).toHaveText(expectedErrorForTooShortLogin);
  });

  test('unsuccessfull login with too short password', async ({ page }) => {
    const userLogin = 'testdemo';
    const userPassword = 'pas';
    const expectedErrorForTooShortPassword = 'hasło ma min. 8 znaków';
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(expectedErrorForTooShortPassword);
  });

})