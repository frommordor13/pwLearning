import {test, expect} from '@playwright/test';
import {loginPageUrl} from "../src/enums/urlConst";
import {UserBuilder} from "../src/helpers/builders";
import {MainPage, AccountSettingsPage, RegistrationPage, LoginPage} from "../src/pages/index";
import * as allure from "allure-js-commons";

let userData;

test.beforeAll(() => {
    userData = new UserBuilder().addUsername().addEmail().addPassword(8).generateUserData();
});

test.describe('Personal account', () => {
    test.beforeEach('New user registration', async ({page}) => {
        await allure.parentSuite("Tests for web interface");
        await allure.suite("Tests for the user's personal account");

        const mainPage = new MainPage(page);
        const regPage = new RegistrationPage(page);

        await test.step('user opens the home page', async () => {
            await mainPage.openBaseUrl('.');
        });
        await test.step('user goes to the registration page', async () => {
            await mainPage.performRegistration();
        });
        await test.step('user registers', async () => {
            await regPage.performSigning(userData.userName, userData.userEmail, userData.userPassword);
        });
        await test.step('Verifying successful registration', async () => {
            await expect(page.getByRole('navigation')).toContainText(userData.userName);
        });
    });


    test('User can log in', async ({page}) => {
        await allure.owner("Egor Petrov");
        await allure.severity("critical");
        await allure.parentSuite("Tests for web interface");
        await allure.suite("Tests for the user's personal account");

        const loginPage = new LoginPage(page);

        await test.step('user goes to the authorization page', async () => {
            await loginPage.openLoginUrl(loginPageUrl);
        });
        await test.step('user logs in via login/password', async () => {
            await loginPage.performAuthorization(userData.userEmail, userData.userPassword);
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

        await test.step('user goes to the authorization page', async () => {
            await loginPage.openLoginUrl(loginPageUrl);
        });
        await test.step('user logs in via login/password', async () => {
            await loginPage.performAuthorization(userData.userEmail, userData.userPassword);
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
            await loginPage.performAuthorization(userData.userEmail, changeUserPassword.userPassword);
        });
        await test.step('Checking successful authorization', async () => {
            await expect(page.getByRole('button', {name: 'Your Feed'})).toBeVisible();
        });
    });
});
