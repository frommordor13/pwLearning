export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailEntryField = page.getByRole('textbox', {name: 'Email'});
        this.passwordEntryField = page.getByRole('textbox', {name: 'Password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
    }

    async performAuthorization(userEmail, userPassword) {
        await this.emailEntryField.click();
        await this.emailEntryField.fill(userEmail);
        await this.passwordEntryField.click();
        await this.passwordEntryField.fill(userPassword);
        await this.loginButton.click();
    }

    async openLoginUrl(url) {
        await this.page.goto(url);
    }
}