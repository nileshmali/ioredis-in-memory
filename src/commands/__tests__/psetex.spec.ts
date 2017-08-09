import Store from '../../Store';
import Expires from '../../Expires';
import { pexpire } from '../pexpire';
import { psetex } from '../psetex';

describe('Test psetex command', () => {
  it('should set expiry on key in milliseconds', () => {
    const redis = new MockRedis();
    expect((<any>redis).psetex('mykey', 10000, 'value')).toBe('OK');
    expect(redis.ttl('mykey')).toBeLessThanOrEqual(10000);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['pexpire'] = pexpire.bind(this);
    (<any>this)['psetex'] = psetex.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
  get(key: string) {
    return this.data.get(key);
  }
  ttl(key: string) {
    return (this.expires.get(key) - Date.now());
  }
}
