import {Container} from 'inversify';
import {PasswordHasher} from './application';
import {BcryptAdapter} from './infrastructure';

async function main() {
  const container = new Container();
  container.bind(PasswordHasher).toConstantValue(new BcryptAdapter(11));
}

main();
