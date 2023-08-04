import { test, expect } from '@playwright/test';
import { loginData } from '../test data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Payment', () => {
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.loginId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.logiInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Paylina Pay';
    const accountNumber = '00 1000 6546 3746 5342 5789 9098';
    const transferAmout = '120';
    const buttonDoTransfer = 'wykonaj przelew';
    const expectedMessageForSuccessfullPayment = `Przelew wykonany! ${transferAmout},00PLN dla ${transferReceiver}`;
    //Act
    await page.getByTestId('transfer_receiver').fill(transferReceiver);
    await page.getByTestId('form_account_to').fill(accountNumber);
    await page.getByTestId('form_amount').fill(transferAmout);
    await page.getByRole('button', { name: buttonDoTransfer }).click();
    await page.getByTestId('close-button').click();
    //Assert
    await expect(page.getByTestId('message-text')).toHaveText(
      expectedMessageForSuccessfullPayment,
    );
  });
});
