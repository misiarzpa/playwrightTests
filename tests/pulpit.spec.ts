import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
    test('successfull quick transfer', async ({ page }) => {
        // Arrange
        const userLogin = 'demotest';
        const userPassword = 'lalalla6';
        const url = 'https://demo-bank.vercel.app/';
        const receiverID = '2';
        const transferAmount = '120';
        const transferTitle = 'Przelew';
        const expectedTextAfterSuccessfullTransfer = 'Przelew wykonany';

        // Act
        await page.goto(url);
        await page.getByTestId('login-input').fill(userLogin);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();

        await page.selectOption('#widget_1_transfer_receiver', receiverID);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitle);
        await page.locator('#execute_btn').click();
        // Assert
        await expect(page.locator('.ui-dialog-title')).toHaveText(expectedTextAfterSuccessfullTransfer)
    });

    test.only('successfull mobile topup', async ({ page }) => {
        //Arrange
        const url = 'https://demo-bank.vercel.app/';
        const userLogin = 'demotest';
        const userPassword = 'lalalla6';
        const receiverId = '502 xxx xxx';
        const topUpAmonut = '120';
        const expectedMessageAfterSuccessfullTopUp = 'Doładowanie wykonane';
        // Act
        await page.goto(url);
        await page.getByTestId('login-input').fill(userLogin);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
        // Assert
        await page.selectOption('#widget_1_topup_receiver', receiverId);
        await page.locator('#widget_1_topup_amount').fill(topUpAmonut);
        await page.locator('#uniform-widget_1_topup_agreement').check();
        await page.locator('#execute_phone_btn').click();
        await page.getByTestId('close-button').click();
        await expect(page.getByTestId('message-text')).toContainText(expectedMessageAfterSuccessfullTopUp)
    });
})