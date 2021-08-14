/**
 * Falhou ao realizar o login do usuário
 */
export class LoginFailError extends Error {
  constructor() {
    super('LoginFailError');
  }
}

/**
 * Falhou ao realizar a ação do captcha
 */
export class CaptchaFailError extends Error {
  constructor() {
    super('CaptchaFailError');
  }
}
