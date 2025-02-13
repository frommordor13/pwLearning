import {test, expect} from '@playwright/test';
import {baseUrl} from "../src/enums/urlConst";
import {loginPageUrl} from "../src/enums/urlConst";
import {UserBuilder} from "../src/helpers/index";
import {MainPage, PersonalAccountPage, RegistrationPage, LoginPage} from  "../src/pages/index";

let userData;

test.beforeAll(() => {
    userData = new UserBuilder().addUsername().addEmail().addPassword(8).generateUserData();
});

test.describe('Личный кабинет', () => {
    test.beforeEach('Регистрация нового пользователя', async ({page}) => {
        const mainPage = new MainPage(page);
        const regPage = new RegistrationPage(page);

        await mainPage.openBaseUrl(baseUrl);
        await mainPage.performRegistration();
        await regPage.performSigning(userData.userName, userData.userEmail, userData.userPassword);
        await expect(page.getByRole('navigation')).toContainText(userData.userName);
    });

    test('Пользователь может авторизоваться', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.openLoginUrl(loginPageUrl);
        await loginPage.performAuthorization(userData.userEmail, userData.userPassword);
        await expect(page.getByRole('button', {name: 'Your Feed'})).toBeVisible();
    });

    test('Пользователь может изменить пароль', async ({page}) => {
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);
        const personalAccountPage = new PersonalAccountPage(page);
        let changeUserPassword = new UserBuilder().addPassword(8).generateUserData();

        await loginPage.openLoginUrl(loginPageUrl);
        await loginPage.performAuthorization(userData.userEmail, userData.userPassword);
        await personalAccountPage.editPassword(changeUserPassword.userPassword);
        await mainPage.performLogout();
        await mainPage.performAuthorization();
        await loginPage.performAuthorization(userData.userEmail, changeUserPassword.userPassword);
        await expect(page.getByRole('button', {name: 'Your Feed'})).toBeVisible();
    });
});