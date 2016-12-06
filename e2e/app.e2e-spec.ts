import { CccCliPage } from './app.po';

describe('ccc-cli App', function() {
  let page: CccCliPage;

  beforeEach(() => {
    page = new CccCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
