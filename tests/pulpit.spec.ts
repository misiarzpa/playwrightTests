import { test, expect } from '@playwright/test';
import { loginData } from '../test data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.loginId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('successfull quick transfer', async ({ page }) => {
    // Arrange
    const receiverID = '2';
    const transferAmount = '120';
    const transferTitle = 'Przelew';
    const expectedTextAfterSuccessfullTransfer = 'Przelew wykonany';
    // Act
    await page.selectOption('#widget_1_transfer_receiver', receiverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#execute_btn').click();
    // Assert
    await expect(page.locator('.ui-dialog-title')).toHaveText(
      expectedTextAfterSuccessfullTransfer,
    );
  });

  test('successfull mobile topup', async ({ page }) => {
    //Arrange
    const receiverId = '502 xxx xxx';
    const topUpAmonut = '120';
    const expectedMessageAfterSuccessfullTopUp = `Doładowanie wykonane! ${topUpAmonut},00PLN na numer ${receiverId}`;
    // Act
    await page.selectOption('#widget_1_topup_receiver', receiverId);
    await page.locator('#widget_1_topup_amount').fill(topUpAmonut);
    await page.locator('#uniform-widget_1_topup_agreement').check();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();
    //Assert
    await expect(page.getByTestId('message-text')).toContainText(
      expectedMessageAfterSuccessfullTopUp,
    );
  });
  test('correct balance after successfull transfer', async ({ page }) => {
    // Arrange
    const receiverID = '2';
    const transferAmount = '120';
    const transferTitle = 'Przelew';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);
    // Act
    await page.selectOption('#widget_1_transfer_receiver', receiverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#execute_btn').click();
    // Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
