import {injectable} from 'inversify';
import {hash, compare} from 'bcrypt';
import {PasswordHasher} from '../../application';

/**
 * ### Adaptador: bcrypt
 *
 * Esse adaptador implementa **PasswordHasher**
 * com métodos do bcrypt
 */
@injectable()
export class BcryptAdapter implements PasswordHasher {
  /**
   * @param salt Número de rounds do bcrypt
   */
  constructor(private salt: number) {}

  /**
   * Implementação de PasswordHasher.hashPassword
   */
  public hashPassword(password: string): Promise<string> {
    return hash(password, this.salt);
  }

  /**
   * Implementação de PasswordHasher.comparePassword
   */
  public comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
