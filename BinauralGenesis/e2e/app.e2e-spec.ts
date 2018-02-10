import { BinauralGenesisPage } from './app.po';

describe('binaural-genesis App', () => {
  let page: BinauralGenesisPage;

  beforeEach(() => {
    page = new BinauralGenesisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
