import {test as setup, expect, test} from '@playwright/test';
import {MainPage, RegistrationPage} from "../src/pages";
import {UserBuilder} from "../src/helpers/builders";
import path from 'path';
import fs from 'fs';

const userStorage = 'playwright/auth/userStorage.json';

setup('New user registration and authorization', async ({page}) => {
    const mainPage = new MainPage(page);
    const regPage = new RegistrationPage(page);
    let userData = new UserBuilder().addUsername().addEmail().addPassword(8).generateUserData();

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
    await page.context().storageState({path: userStorage});
    const credentials = {
        userEmail: userData.userEmail,
        userPassword: userData.userPassword
    };
    fs.writeFileSync(path.join(__dirname, 'credentials.json'), JSON.stringify(credentials));
});
