export class AccountProfilePage {
    constructor(page) {
        this.page = page;
        this.dropdownMenu = page.locator('.dropdown-toggle');
        this.accountProfile = page.getByRole('link', {name: 'Profile'});
        this.addToFavoriteButton = page.getByRole('button', {name: '( 0 )'}).first();
        this.favoriteArticle = page.getByRole('link', {name: 'Favorited Articles'});
    }

    async addToFavoriteArticle() {
        await this.dropdownMenu.click();
        await this.accountProfile.click();
        await this.addToFavoriteButton.click();
        await this.favoriteArticle.click();
    }
}
