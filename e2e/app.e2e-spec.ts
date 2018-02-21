import { JustificadorFrontPage } from './app.po';

describe('justificador-front App', function() {
  let page: JustificadorFrontPage;

  beforeEach(() => {
    page = new JustificadorFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
