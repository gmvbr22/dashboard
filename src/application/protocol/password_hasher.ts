/**
 * Interface que implementa o Hash da senha
 */
export interface PasswordHasher {
  /**
   * Gerar o hash da senha
   *
   * @param password Senha em texto plano
   */
  hashPassword(password: string): Promise<string>;
  /**
   * Comparar o hash com a senha
   *
   * @param password Senha em texto plano
   * @param hash Hash gerado por hashPassword
   */
  comparePassword(password: string, hash: string): Promise<boolean>;
}
