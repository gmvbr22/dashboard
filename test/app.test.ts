import {message} from '../src/app';

describe('Test message', () => {
  test('Expect "Hello world"', () => {
    expect(message()).toBe('Hello world');
  });
});
