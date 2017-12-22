import { Bomberman3dPage } from './app.po';

describe('bomberman3d App', () => {
  let page: Bomberman3dPage;

  beforeEach(() => {
    page = new Bomberman3dPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
