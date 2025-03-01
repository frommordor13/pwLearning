export class AccountSettingsPage {
    constructor(page) {
        this.page = page;
        this.dropdownMenu = page.locator('.dropdown-toggle');
        this.accountSettings = page.getByRole('link', {name: 'Settings'});
        this.passwordField = page.getByRole('textbox', {name: 'Password'});
        this.updateButton = page.getByRole('button', {name: 'Update Settings'});
    }

    async editPassword(newPassword) {
        await this.dropdownMenu.click();
        await this.accountSettings.click();
        await this.passwordField.click();
        await this.passwordField.fill(newPassword);
        await this.updateButton.click();
    }
}
