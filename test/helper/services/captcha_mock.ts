import {CaptchaService} from '../../../src/application';

export class CaptchaServiceMock extends CaptchaService {
  constructor(public _verify: boolean) {
    super();
  }

  async verify(): Promise<boolean> {
    return this._verify;
  }
}
