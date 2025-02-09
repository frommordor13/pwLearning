export class ArticlePage {
    constructor(page) {
        this.page = page;
        this.newArticleButton = page.getByRole('link', {name: 'New Article'});
        this.articleTitle = page.getByRole('textbox', {name: 'Article Title'});
        this.articleDetails = page.getByRole('textbox', {name: 'What\'s this article about?'});
        this.articleBody = page.getByRole('textbox', {name: 'Write your article (in'});
        this.articleTags = page.getByRole('textbox', {name: 'Enter tags'});
        this.publishArticleButton = page.getByRole('button', {name: 'Publish Article'});
        this.commentField = page.getByRole('textbox', {name: 'Write a comment...'});
        this.postCommentButton = page.getByRole('button', {name: 'Post Comment'});
    }

    async publicationArticle(title, details, body, tags) {
        await this.newArticleButton.click();
        await this.articleTitle.click();
        await this.articleTitle.fill(title);
        await this.articleDetails.click();
        await this.articleDetails.fill(details);
        await this.articleBody.click();
        await this.articleBody.fill(body);
        await this.articleTags.click();
        await this.articleTags.fill(tags);
        await this.publishArticleButton.click();
    }

    async publicationComment(comment) {
        await this.commentField.click();
        await this.commentField.fill(comment);
        await this.postCommentButton.click();
    }
}