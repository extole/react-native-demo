describe('Extole DemoApp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Button should have correct CTA Item text', async () => {
    await expect(element(by.text('CTA Item'))).toBeVisible();
  });

  it('A button for webview should be visibile', async () => {
    await expect(element(by.text('WebView Example'))).toBeVisible();
  });

  it('When tapping on WebView Example microsite is displayed', async () => {
    await expect(element(by.text('WebView Example'))).toBeVisible();
    await element(by.text('WebView Example')).tap();
    await expect(element(by.text('Promo'))).toBeVisible();
  });

  it('When tapping on CTA Button native share is displayed', async () => {
    await expect(element(by.text('CTA Item'))).toBeVisible();
    await element(by.text('CTA Item')).tap();
    await expect(element(by.text('Copy'))).toBeVisible();
  });
});
