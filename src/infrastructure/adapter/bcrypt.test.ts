import {BcryptAdapter} from './bcrypt';

describe('Test BcryptAdapter', () => {
  test('expect interface PasswordHasher', async () => {
    const adapter = new BcryptAdapter(10);

    const hash1 = await adapter.hashPassword('password');
    const hash2 = await adapter.hashPassword('password');

    expect(hash1.length).toBe(60);
    expect(hash2.length).toBe(60);

    expect(hash1).not.toBe(hash2);

    const verify1 = await adapter.comparePassword('password', hash1);
    const verify2 = await adapter.comparePassword('password2', hash1);

    expect(verify1).toBeTruthy();
    expect(verify2).toBeFalsy();
  });
});
