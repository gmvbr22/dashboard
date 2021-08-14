import {injectable} from 'inversify';
import {CaptchaFailError, LoginFailError} from '../errors';
import {TokenResult, TokenService} from '../protocol/token_service';
import {CaptchaService} from '../protocol/captcha_service';
import {PasswordHasher} from '../protocol/password_hasher';
import {FindUser} from '../repository/user_repository';

/**
 * Parâmetros do Login
 */
export interface LoginCaseParams {
  email: string;
  password: string;
  captcha: string;
  ip: string;
}

/**
 * Caso de uso: Login
 */
@injectable()
export class LoginCase {
  constructor(
    private findUser: FindUser,
    private password: PasswordHasher,
    private captcha: CaptchaService,
    private token: TokenService
  ) {}

  /**
   * ## Caso de uso do login do usuário
   * Retorna **TokenResult** se bem sucedido
   *
   * ### Deve ser tratado os erros:
   * - CaptchaFailError
   * - LoginFailError
   *
   * @param input
   * @returns
   */
  public async login(input: LoginCaseParams): Promise<TokenResult> {
    const isValidCaptcha = await this.captcha.verify(input.captcha, input.ip);
    if (!isValidCaptcha) {
      throw new CaptchaFailError();
    }
    const currentUser = await this.findUser.getByEmail(input.email);
    if (currentUser === null) {
      throw new LoginFailError();
    }
    const isValidPassword = await this.password.comparePassword(
      input.password,
      currentUser.password!
    );
    if (!isValidPassword) {
      throw new LoginFailError();
    }
    const token = await this.token.generate({
      sub: currentUser.id,
      role: currentUser.role,
    });
    return token;
  }
}
