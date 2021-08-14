import {FindUser} from '../../../src/application';
import {User} from '../../../src/domain';

export class FindUserMock extends FindUser {
  constructor(public user: User | null) {
    super();
  }

  public async getByEmail(): Promise<User | null> {
    return this.user;
  }
}
