export class MainPage {
    constructor(page) {
        this.page = page;
        this.signupButton = page.getByRole('link', {name: 'Sign up'});
        this.loginButton = page.getByRole('link', {name: 'Login'});
        this.logoutButton = page.getByRole('link', {name: 'Logout'});
        this.dropdownMenu = page.locator('.dropdown-toggle');
    }

    async performRegistration() {
        await this.signupButton.click();
    }

    async performLogout() {
        await this.dropdownMenu.click();
        await this.logoutButton.click();
    }

    async performAuthorization() {
        await this.loginButton.click();
    }

    async openBaseUrl(url) {
        await this.page.goto(url);
    }
}