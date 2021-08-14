/**
 * Resultado do token de acesso
 */
export interface TokenResult {
  /**
   * Token de acesso
   */
  token: string;

  /**
   * Expiração do token em unix epoch
   */
  expire_in: number;
}

/**
 * Serviço de token
 */
export abstract class TokenService {
  /**
   * Gerar token de acesso
   *
   * @param payload Carga útil
   */
  abstract generate<T>(payload: T): Promise<TokenResult>;

  /**
   * Validar o token
   *
   * Se estiver inválido retorna null
   *
   * @returns Carga útil ou null
   */
  abstract validate<T>(token: string): Promise<null | T>;
}
