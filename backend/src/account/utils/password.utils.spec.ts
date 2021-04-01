import { PasswordUtils } from './password.utils';

const PLAIN_TEXT_PASSWORD = 'hello1234';

describe('PasswordUtils', () => {
  let hashed: string;
  it('should able to hash plain text', async () => {
    hashed = await PasswordUtils.hash(PLAIN_TEXT_PASSWORD);
    expect(hashed).not.toEqual(PLAIN_TEXT_PASSWORD);
  });

  it('should able to compare hashed text', async () => {
    const result = await PasswordUtils.compare(PLAIN_TEXT_PASSWORD, hashed);
    expect(result).toEqual(true);
  });
});
