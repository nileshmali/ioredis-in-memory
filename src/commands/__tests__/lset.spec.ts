import Store from '../../Store';
import Expires from '../../Expires';
import { lset } from '../lset';

describe('Test lset command', () => {
  it('should set new value at start index', () => {
    const redis = new MockRedis({
      mylist: ['one', 'two', 'three', 'four']
    });
    expect((<any>redis).lset('mylist', '1', 'five')).toBe('OK');
    expect(redis.get('mylist')[1]).toBe('five');
  });

  it('should set new value at end index', () => {
    const redis = new MockRedis({
      mylist: ['one', 'two', 'three', 'four']
    });
    expect((<any>redis).lset('mylist', '-2', 'five')).toBe('OK');
    expect(redis.get('mylist')[2]).toBe('five');
  });

  it('should throw if key does not exists', () => {
    const redis = new MockRedis();
    expect(() => (<any>redis).lset('mylist', '-2', 'five'))
      .toThrowError('No such key');
  });

  it('should throw if key does not contain list', () => {
    const redis = new MockRedis({
      mylist: 'one'
    });
    expect(() => (<any>redis).lset('mylist', '-2', 'five'))
      .toThrowError('Key mylist does not contain a list');
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['lset'] = lset.bind(this);
  }

  get(key: string) {
    return this.data.get(key);
  }

  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
