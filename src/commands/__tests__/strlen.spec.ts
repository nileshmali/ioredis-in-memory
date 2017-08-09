import Store from '../../Store';
import Expires from '../../Expires';
import { strlen } from '../strlen';

describe('Test strlen command', () => {
  it('should return string length', () => {
    const redis = new MockRedis({
      mykey: 'Hello world',
    });
    expect((<any>redis).strlen('mykey')).toBe(11);
    expect((<any>redis).strlen('nonexisting')).toBe(0);
  });

  it('should throw error if typeof value is not String', () => {
    const redis = new MockRedis({
      notstring: ['one', 'two'],
    });
    expect(() => (<any>redis).strlen('notstring'))
      .toThrowError('Key notstring does not contain a string');
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['strlen'] = strlen.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
