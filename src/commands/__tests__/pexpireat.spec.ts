import Store from '../../Store';
import Expires from '../../Expires';
import { pexpireat } from '../pexpireat';

describe('Test pexpireat command', () => {
  it('should set expiry on key in seconds', () => {
    const redis = new MockRedis({ mykey: 'value' });
    const expiry = Date.now() + 10000;
    expect((<any>redis).pexpireat('mykey', expiry)).toBe(1);
    expect(redis.ttl('mykey')).toBeLessThanOrEqual(10000);
  });

  it('should return 0 if key does not exists', () => {
    const redis = new MockRedis();
    const expiry = Date.now() + 10000;
    expect((<any>redis).pexpireat('mykey', expiry)).toBe(0);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['pexpireat'] = pexpireat.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  ttl(key: string) {
    return (this.expires.get(key) - Date.now());
  }
}
