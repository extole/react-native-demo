import wd from 'wd';

const PORT = 4723;
const driver = wd.promiseChainRemote('0.0.0.0', PORT);

beforeEach(() => {
  driver.launchApp();
});

afterEach(() => {
  driver.closeApp();
});

describe('My Login application', () => {
  it('should login with valid credentials', async () => {
    await $('#username').setValue('tomsmith');
    await $('#password').setValue('SuperSecretPassword!');
    await $('button[type="submit"]').click();

    await expect($('#flash')).toBeExisting();
    await expect($('#flash')).toHaveTextContaining(
      'You logged into a secure area!',
    );
  });
});
