import Store from '../../Store';
import Expires from '../../Expires';
import { expireat } from '../expireat';

describe('Test expireat command', () => {
  it('should set expiry on key in seconds', () => {
    const redis = new MockRedis({ mykey: 'value' });
    const expiry = Math.ceil(Date.now() / 1000) + 9;
    expect((<any>redis).expireat('mykey', expiry)).toBe(1);
    expect(redis.ttl('mykey')).toBeLessThanOrEqual(10);
  });

  it('should return 0 if key does not exists', () => {
    const redis = new MockRedis();
    const expiry = Math.ceil(Date.now() / 1000) + 10;
    expect((<any>redis).expireat('mykey', expiry)).toBe(0);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['expireat'] = expireat.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  ttl(key: string) {
    return Math.ceil((this.expires.get(key) - Date.now()) / 1000);
  }
}
