import {fakerRU as faker} from '@faker-js/faker'

export class ArticleBuilder {
    addTitle() {
        this.articleTitle = `title - ${faker.hacker.noun()} ${faker.hacker.phrase()}`;
        return this;
    }

    addDetails() {
        this.articleDetails = faker.hacker.phrase();
        return this;
    }

    addBody() {
        this.articleBody = faker.lorem.paragraphs(2);
        return this;
    }

    addTags() {
        this.articleTags = faker.hacker.phrase();
        return this;
    }

    addComment() {
        this.articleComment = faker.hacker.phrase();
        return this;
    }

    generateArticle() {
        return {
            articleTitle: this.articleTitle,
            articleDetails: this.articleDetails,
            articleBody: this.articleBody,
            articleTags: this.articleTags,
            articleComment: this.articleComment
        };
    }
}