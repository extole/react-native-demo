describe('Extole DemoApp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Button should have correct CTA Item text', async () => {
    await expect(element(by.text('CTA ITEM'))).toBeVisible();
  });

  it('A button for webview should be visibile', async () => {
    await expect(element(by.text('WEBVIEW EXAMPLE'))).toBeVisible();
  });

  it('When tapping on WebView Example microsite is displayed', async () => {
    await expect(element(by.text('WEBVIEW EXAMPLE'))).toBeVisible();
    await element(by.text('WEBVIEW EXAMPLE')).tap();
    await expect(element(by.text('Promo'))).toBeVisible();
  });

  it('When tapping on CTA Button native share is displayed', async () => {
    await expect(element(by.text('CTA ITEM'))).toBeVisible();
    await element(by.text('CTA ITEM')).tap();
    await expect(element(by.text('Messages'))).toBeVisible();
  });
});
