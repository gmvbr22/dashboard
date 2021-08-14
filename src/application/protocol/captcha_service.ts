/**
 * Serviço de captcha
 */
export abstract class CaptchaService {
  /**
   * Verificar captcha
   *
   * @param response Resposta do captcha
   * @param ip Ip do usuário
   */
  abstract verify(response: string, ip: string): Promise<boolean>;
}
