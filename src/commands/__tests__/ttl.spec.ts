import Store from '../../Store';
import Expires from '../../Expires';
import { ttl } from '../ttl';

describe('Test ttl command', () => {
  it('should return ttl in seconds', () => {
    const redis = new MockRedis({ mykey: 'Hello' });
    redis.expire('mykey', 10);
    expect((<any>redis).ttl('mykey')).toBeLessThanOrEqual(10);
  });

  it('should return -2 if key does not exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).ttl('mykey')).toBe(-2);
  });

  it('should return -1 if expiry is not set', () => {
    const redis = new MockRedis({ mykey: 'Hello' });
    expect((<any>redis).ttl('mykey')).toBe(-1);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['ttl'] = ttl.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  expire(key: string, seconds: number) {
    return this.expires.set(key, Date.now() + (seconds * 1000));
  }
}
