import {TokenResult, TokenService} from '../../../src/application';

export class TokenServiceMock extends TokenService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public _generate: TokenResult, public _validate: any | null) {
    super();
  }

  public async generate(): Promise<TokenResult> {
    return this._generate;
  }

  public async validate<T>(): Promise<T | null> {
    return this._validate;
  }
}
