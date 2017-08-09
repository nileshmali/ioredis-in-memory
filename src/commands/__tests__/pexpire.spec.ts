import Store from '../../Store';
import Expires from '../../Expires';
import { pexpire } from '../pexpire';

describe('Test pexpire command', () => {
  it('should set expiry on key in milliseconds', () => {
    const redis = new MockRedis({ mykey: 'value' });
    expect((<any>redis).pexpire('mykey', 10000)).toBe(1);
    expect(redis.ttl('mykey')).toBeLessThanOrEqual(10000);
  });

  it('should return 0 if key does not exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).pexpire('mykey', 10)).toBe(0);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['pexpire'] = pexpire.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  ttl(key: string) {
    return (this.expires.get(key) - Date.now());
  }
}
