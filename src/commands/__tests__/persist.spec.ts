import Store from '../../Store';
import Expires from '../../Expires';
import { persist } from '../persist';

describe('Test persist command', () => {
  it('should remove expiry for key', () => {
    const redis = new MockRedis({ mykey: 'Hello' });
    redis.expire('mykey', 100);
    expect(redis.getExpire('mykey')).not.toBeNull();
    expect((<any>redis).persist('mykey')).toBe(1);
    expect(redis.getExpire('mykey')).toBeNull();
  });

  it('should return 0 if key not found', () => {
    const redis = new MockRedis();
    expect((<any>redis).persist('mykey')).toBe(0);
  });

  it('should return 0 if key does not have any expiry', () => {
    const redis = new MockRedis({ mykey: 'Hello' });
    expect((<any>redis).persist('mykey')).toBe(0);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['persist'] = persist.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
  get(key: string) {
    return this.data.get(key);
  }
  expire(key: string, seconds: number) {
    return this.expires.set(key, Date.now() + (seconds * 1000));
  }

  getExpire(key: string) {
    return this.expires.get(key) || null;
  }
}
