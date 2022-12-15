import wd from 'wd';

const PORT = 4723;
const config = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: '/Users/diftodi/extole/code/react-native-demo/DemoApp/android/app/build/outputs/apk/release/app-release.apk',
};

const driver = wd.promiseChainRemote('0.0.0.0', PORT);
jest.setTimeout(60000);
beforeAll(async () => {
  await driver.init(config);
  await driver.sleep(20000);
});

test('my first appium test', async () => {
  expect(await driver.hasElementByAccessibilityId('cta-button')).toBe(true);
  const element = await driver.elementByAccessibilityId('cta-button');
  await element.click();
  expect(await driver.hasElementByAccessibilityId('notHere')).toBe(false);
});
