import { NgEventSchedulerPage } from './app.po';

describe('ng-event-scheduler App', () => {
  let page: NgEventSchedulerPage;

  beforeEach(() => {
    page = new NgEventSchedulerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
