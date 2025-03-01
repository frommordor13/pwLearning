import {test, expect} from '@playwright/test';
import * as allure from 'allure-js-commons';
import {UserBuilder, ArticleBuilder} from "../src/helpers/builders";
import {ArticlePage, MainPage, RegistrationPage, AccountProfilePage} from "../src/pages/index";

let userData;

test.beforeAll(() => {
    userData = new UserBuilder().addUsername().addEmail().addPassword(8).generateUserData();
});

test.describe('Users article', () => {
    let articleBuilder;
    test.beforeEach('Publishing a new article', async ({page}) => {
        await allure.parentSuite("Tests for web interface");
        await allure.suite("Tests on the web section of articles");

        const articlePage = new ArticlePage(page);
        const mainPage = new MainPage(page);
        const regPage = new RegistrationPage(page);
        articleBuilder = new ArticleBuilder().addTitle().addDetails().addBody().addTags().generateArticle();

        await test.step('user opens the home page', async () => {
            await mainPage.openBaseUrl('.');
        });
        await test.step('user goes to the registration page', async () => {
            await mainPage.performRegistration();
        });
        await test.step('user registers', async () => {
            await regPage.performSigning(userData.userName, userData.userEmail, userData.userPassword);
        });
        await test.step('User creates an article', async () => {
            await articlePage.publicationArticle(articleBuilder.articleTitle, articleBuilder.articleDetails, articleBuilder.articleBody, articleBuilder.articleTags);
        });
        await test.step('Verifying successful article creation', async () => {
            await expect(page.getByRole('button', {name: 'Delete Article'}).nth(1)).toBeVisible();
        });
    });

    test('User can leave a comment on the article', async ({page}) => {
        await allure.owner("Egor Petrov");
        await allure.severity("critical");
        await allure.parentSuite("Tests for web interface");
        await allure.suite("Tests on the web section of articles");

        const articlePage = new ArticlePage(page);
        const articleBuilder = new ArticleBuilder().addComment().generateArticle();

        await test.step('user can post a comment to the article', async () => {
            await articlePage.publicationComment(articleBuilder.articleComment);
        });
        await test.step('Checking if a comment has been published', async () => {
            await expect(page.getByRole('main')).toContainText(articleBuilder.articleComment);
        });
    });

    test('User can change the title of the article', async ({page}) => {
        await allure.owner("Egor Petrov");
        await allure.severity("critical");
        await allure.parentSuite("Tests for web interface");
        await allure.suite("Tests on the web section of articles");

        const articlePage = new ArticlePage(page);
        const articleBuilder = new ArticleBuilder().addTitle().generateArticle();

        await test.step('user changes the title of a published article', async () => {
            await articlePage.updateArticleTitle(articleBuilder.articleTitle);
        });
        await test.step('Checking if the article title has been changed', async () => {
            await expect(page.getByRole('heading')).toContainText(articleBuilder.articleTitle);
        });
    });

    test('User can delete published article', async ({page}) => {
        await allure.owner("Egor Petrov");
        await allure.severity("critical");
        await allure.parentSuite("Tests for web interface");
        await allure.suite("Tests on the web section of articles");

        const articlePage = new ArticlePage(page);

        await test.step('user delete published article', async () => {
            await articlePage.deleteArticle(page);
        });
        await test.step('Checking if the article delete', async () => {
            await expect(page.getByRole('main')).toContainText('Articles not available.');
        });
    });

    test('User can add the article to favorites', async ({page}) => {
        await allure.owner("Egor Petrov");
        await allure.severity("critical");
        await allure.parentSuite("Tests for web interface");
        await allure.suite("Tests on the web section of articles");

        const accountProfilePage = new AccountProfilePage(page);

        await test.step('user adds article to favorites', async () => {
            await accountProfilePage.addToFavoriteArticle(page);
        });
        await test.step('Checking if the article add to favorite', async () => {
            await expect(page.getByRole('button', {name: '( 1 )'}).first()).toBeVisible();
            await expect(page.locator('h1')).toContainText(articleBuilder.articleTitle);
        });
    });
});
