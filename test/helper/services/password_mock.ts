import {PasswordHasher} from '../../../src/application';

export class PasswordHasherMock extends PasswordHasher {
  constructor(public _compare: boolean, public _hash: string) {
    super();
  }

  public async hashPassword(): Promise<string> {
    return this._hash;
  }

  public async comparePassword(): Promise<boolean> {
    return this._compare;
  }
}
