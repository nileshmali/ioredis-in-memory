import Store from '../../Store';
import Expires from '../../Expires';
import { expire } from '../expire';
import { setex } from '../setex';

describe('Test setex command', () => {
  it('should set expiry on key in seconds', () => {
    const redis = new MockRedis();
    expect((<any>redis).setex('mykey', 10, 'value')).toBe('OK');
    expect(redis.ttl('mykey')).toBeLessThanOrEqual(10);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['expire'] = expire.bind(this);
    (<any>this)['setex'] = setex.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
  get(key: string) {
    return this.data.get(key);
  }
  ttl(key: string) {
    return Math.ceil((this.expires.get(key) - Date.now()) / 1000);
  }
}
