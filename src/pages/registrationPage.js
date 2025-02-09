export class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.nameEntryField = page.getByRole('textbox', {name: 'Your Name'});
        this.emailEntryField = page.getByRole('textbox', {name: 'Email'});
        this.passwordEntryField = page.getByRole('textbox', {name: 'Password'});
        this.signUpButton = page.getByRole('button', {name: 'Sign up'});
    }

    async performSigning(userName, userEmail, userPassword) {
        await this.nameEntryField.click();
        await this.nameEntryField.fill(userName);
        await this.emailEntryField.click();
        await this.emailEntryField.fill(userEmail);
        await this.passwordEntryField.click();
        await this.passwordEntryField.fill(userPassword);
        await this.signUpButton.click();
    }
}