import 'reflect-metadata';
import {Container} from 'inversify';
import {PasswordHasher} from '../../application';
import {BcryptAdapter} from './bcrypt';

describe('Test BcryptAdapter', () => {
  test('expect interface PasswordHasher', async () => {
    const container = new Container();
    container.bind(PasswordHasher).toConstantValue(new BcryptAdapter(11));

    const adapter = container.get(PasswordHasher);

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
