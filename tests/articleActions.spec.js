import {test, expect} from '@playwright/test';
import {baseUrl} from "../src/enums/urlConst";
import {UserBuilder, ArticleBuilder} from "../src/helpers/index";
import {ArticlePage, MainPage, RegistrationPage} from "../src/pages/index";

let userData;

test.beforeAll(() => {
    userData = new UserBuilder().addUsername().addEmail().addPassword(8).generateUserData();
});

test.describe('Пользовательские статьи', () => {
    test.beforeEach('Публикация новой статьи', async ({page}) => {
        const articlePage = new ArticlePage(page);
        const mainPage = new MainPage(page);
        const regPage = new RegistrationPage(page);
        const articleBuilder = new ArticleBuilder().addTitle().addDetails().addBody().addTags().generateArticle();

        await mainPage.openBaseUrl(baseUrl);
        await mainPage.performRegistration();
        await regPage.performSigning(userData.userName, userData.userEmail, userData.userPassword);
        await articlePage.publicationArticle(articleBuilder.articleTitle, articleBuilder.articleDetails, articleBuilder.articleBody, articleBuilder.articleTags);
        await expect(page.getByRole('button', {name: 'Delete Article'}).nth(1)).toBeVisible();
    });

    test('Пользователь может оставить комментарий к статье', async ({page}) => {
        const articlePage = new ArticlePage(page);
        const articleBuilder = new ArticleBuilder().addComment().generateArticle();

        await articlePage.publicationComment(articleBuilder.articleComment);
        await expect(page.getByRole('main')).toContainText(articleBuilder.articleComment);
    });
});