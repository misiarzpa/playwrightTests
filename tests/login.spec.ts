import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {

  test.beforeEach(async({page})=>{
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
  })

  test('successfull login with correct credentials', async ({ page }) => {
    // Arrange
    const userLogin = 'demotest';
    const userPassword = 'lalalla6';
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
    await expect(page.getByTestId('error-login-id')).toHaveText(expectedErrorForTooShortLogin);
  });

  test('unsuccessfull login with too short password', async ({ page }) => {
    //Arrange
    const userLogin = 'testdemo';
    const userPassword = 'pas';
    const expectedErrorForTooShortPassword = 'hasło ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('password-input').blur();

    //Asset
    await expect(page.getByTestId('error-login-password')).toHaveText(expectedErrorForTooShortPassword);
  });

})