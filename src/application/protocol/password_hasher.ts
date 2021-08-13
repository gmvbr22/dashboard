/**
 * Abstração que implementa o Hash da senha
 */
export abstract class PasswordHasher {
  /**
   * Gerar o hash da senha
   *
   * @param password Senha em texto plano
   */
  abstract hashPassword(password: string): Promise<string>;
  /**
   * Comparar o hash com a senha
   *
   * @param password Senha em texto plano
   * @param hash Hash gerado por hashPassword
   */
  abstract comparePassword(password: string, hash: string): Promise<boolean>;
}
