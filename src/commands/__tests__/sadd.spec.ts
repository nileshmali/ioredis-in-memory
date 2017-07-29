import Store from '../../Store';
import Expires from '../../Expires';
import { sadd } from '../sadd';

describe('Test sadd command', () => {
  it('should add unique elements to set', () => {
    const redis = new MockRedis();
    expect((<any>redis).sadd('myset', '1', '2', '1')).toBe(2);
    expect(redis.get('myset').size).toBe(2);
  });

  it('should throw if value is not a Set', () => {
    const redis = new MockRedis({
      myset: 'value'
    });
    expect(() => (<any>redis).sadd('myset', '1', '2', '1'))
      .toThrowError('Key myset does not contain a set');

  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['sadd'] = sadd.bind(this);
  }

  get(key: string) {
    return this.data.get(key);
  }

  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
