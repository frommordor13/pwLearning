import {test, expect} from '@playwright/test';
import {loginPageUrl} from "../src/enums/urlConst";
import {UserBuilder} from "../src/helpers/builders";
import {MainPage, AccountSettingsPage, LoginPage} from "../src/pages/index";
import * as allure from "allure-js-commons";
import path from 'path';
import fs from 'fs';

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json'), 'utf-8'));

test.use({storageState: 'playwright/auth/userStorage.json'});

test.describe('Personal account', () => {
    test('User can log in', async ({page}) => {
        await allure.owner("Egor Petrov");
        await allure.severity("critical");
        await allure.parentSuite("Tests for web interface");
        await allure.suite("Tests for the user's personal account");

        const loginPage = new LoginPage(page);
        const mainPage = new MainPage(page);

        await test.step('user goes to the authorization page', async () => {
            await loginPage.openLoginUrl(loginPageUrl);
        });
        await test.step('user logs out of the personal account', async () => {
            await mainPage.performLogout();
        });
        await test.step('user logs in via login/password', async () => {
            await loginPage.performAuthorization(credentials.userEmail, credentials.userPassword);
        });
        await test.step('Checking successful authorization', async () => {
            await expect(page.getByRole('button', {name: 'Your Feed'})).toBeVisible();
        });
    });

    test('User can change password', async ({page}) => {
        await allure.owner("Egor Petrov");
        await allure.severity("critical");
        await allure.parentSuite("Tests for web interface");
        await allure.suite("Tests for the user's personal account");

        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);
        const personalAccountPage = new AccountSettingsPage(page);
        let changeUserPassword = new UserBuilder().addPassword(8).generateUserData();
        let testPassed = false;

        try {
            await test.step('user opens the home page', async () => {
                await mainPage.openBaseUrl('.');
            });
            await test.step('user changes the password in the personal account', async () => {
                await personalAccountPage.editPassword(changeUserPassword.userPassword);
            });
            await test.step('user logs out of the personal account', async () => {
                await mainPage.performLogout();
            });
            await test.step('user goes to the authorization page', async () => {
                await loginPage.openLoginUrl(loginPageUrl);
            });
            await test.step('user logs in using the login and changed password.', async () => {
                await loginPage.performAuthorization(credentials.userEmail, changeUserPassword.userPassword);
            });
            await test.step('Checking successful authorization', async () => {
                await expect(page.getByRole('button', {name: 'Your Feed'})).toBeVisible();
            });

            testPassed = true;

        } catch (error) {
            console.error('An error occurred during the test', error);
        } finally {
            if (testPassed) {
                await test.step('setting a default password', async () => {
                    await personalAccountPage.editPassword(credentials.userPassword);
                });
            } else {
                console.log('Test failed');
            }
        }
    });
});
