import {injectable} from 'inversify';
import {User} from '../../domain/user';

/**
 * Busca de usuários
 */
@injectable()
export abstract class FindUser {
  /**
   *  Retorna o usuário com base no email, se não existir retorna null
   *
   * @param email Email válido
   */
  abstract getByEmail(email: string): Promise<User | null>;
}
