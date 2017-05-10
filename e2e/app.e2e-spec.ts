import { PangoWebPage } from './app.po';

describe('pango-web App', () => {
  let page: PangoWebPage;

  beforeEach(() => {
    page = new PangoWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
