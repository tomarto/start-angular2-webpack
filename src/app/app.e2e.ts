import { browser, by, element } from 'protractor';

describe('App', () => {
    beforeEach(() => {
        browser.get('/');
    });

    it('should have a title', () => {
        let subject = browser.getTitle();
        let result = 'Welcome to SDS';
        expect<any>(subject).toEqual(result);
    });
});
