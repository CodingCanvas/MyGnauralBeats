import { MyGnauralBeatsPage } from './app.po';

describe('binaural-genesis App', () => {
  let page: MyGnauralBeatsPage;

  beforeEach(() => {
    page = new MyGnauralBeatsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
