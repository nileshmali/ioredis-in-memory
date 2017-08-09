import Store from '../../Store';
import Expires from '../../Expires';
import { pttl } from '../pttl';

describe('Test pttl command', () => {
  it('should return ttl in milliseconds', () => {
    const redis = new MockRedis({ mykey: 'Hello' });
    redis.expire('mykey', 10);
    expect((<any>redis).pttl('mykey')).toBeGreaterThan(5000);
  });

  it('should return -2 if key does not exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).pttl('mykey')).toBe(-2);
  });

  it('should return -1 if expiry is not set', () => {
    const redis = new MockRedis({ mykey: 'Hello' });
    expect((<any>redis).pttl('mykey')).toBe(-1);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['pttl'] = pttl.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  expire(key: string, seconds: number) {
    return this.expires.set(key, Date.now() + (seconds * 1000));
  }
}
