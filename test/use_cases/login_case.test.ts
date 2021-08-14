import 'reflect-metadata';
import {Container} from 'inversify';
import {
  CaptchaFailError,
  CaptchaService as CS,
  FindUser as FU,
  LoginCase as LC,
  LoginCaseParams,
  LoginFailError,
  PasswordHasher as PH,
  TokenService as TS,
} from '../../src/application';
import {CaptchaServiceMock} from '../helper/services/captcha_mock';
import {PasswordHasherMock} from '../helper/services/password_mock';
import {TokenServiceMock} from '../helper/services/token_mock';
import {FindUserMock} from '../helper/repository/user_mock';
import {User} from '../../src/domain';

describe('Test LoginCase', () => {
  const data: LoginCaseParams = {
    email: 'xx',
    password: 'xx',
    captcha: 'xxx',
    ip: 'xx',
  };
  test('expect invalid captcha', async () => {
    const container = new Container();
    const token = new TokenServiceMock(
      {token: 'xxxxx', expire_in: 5050},
      'xxxxx'
    );
    container.bind(CS).toConstantValue(new CaptchaServiceMock(false));
    container.bind(PH).toConstantValue(new PasswordHasherMock(true, 'xxxxx'));
    container.bind(TS).toConstantValue(token);
    container.bind(FU).toConstantValue(new FindUserMock(null));
    container.bind(LC).toSelf();

    try {
      await container.get(LC).login(data);
    } catch (e) {
      expect(e).toBeInstanceOf(CaptchaFailError);
    }
  });

  test('expect invalid user', async () => {
    const container = new Container();
    const token = new TokenServiceMock(
      {token: 'xxxxx', expire_in: 5050},
      'xxxxx'
    );
    container.bind(CS).toConstantValue(new CaptchaServiceMock(true));
    container.bind(PH).toConstantValue(new PasswordHasherMock(true, 'xxxxx'));
    container.bind(TS).toConstantValue(token);
    container.bind(FU).toConstantValue(new FindUserMock(null));
    container.bind(LC).toSelf();

    try {
      await container.get(LC).login(data);
    } catch (e) {
      expect(e).toBeInstanceOf(LoginFailError);
    }
  });

  test('expect invalid password', async () => {
    const container = new Container();
    const token = new TokenServiceMock(
      {token: 'xxxxx', expire_in: 5050},
      'xxxxx'
    );
    container.bind(CS).toConstantValue(new CaptchaServiceMock(true));
    container.bind(PH).toConstantValue(new PasswordHasherMock(false, 'xxxxx'));
    container.bind(TS).toConstantValue(token);
    container.bind(FU).toConstantValue(new FindUserMock(new User()));
    container.bind(LC).toSelf();
    try {
      await container.get(LC).login(data);
    } catch (e) {
      expect(e).toBeInstanceOf(LoginFailError);
    }
  });

  test('expect token', async () => {
    const container = new Container();
    const token = new TokenServiceMock(
      {token: 'xxxxx', expire_in: 5050},
      'xxxxx'
    );
    container.bind(CS).toConstantValue(new CaptchaServiceMock(true));
    container.bind(PH).toConstantValue(new PasswordHasherMock(true, 'xxxxx'));
    container.bind(TS).toConstantValue(token);
    container.bind(FU).toConstantValue(new FindUserMock(new User()));
    container.bind(LC).toSelf();
    try {
      const token = await container.get(LC).login(data);
      expect(token.expire_in).toBe(5050);
      expect(token.token).toBe('xxxxx');
    } catch (e) {
      fail(e);
    }
  });
});
