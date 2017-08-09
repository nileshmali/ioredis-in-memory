import Store from '../../Store';
import Expires from '../../Expires';
import { expire } from '../expire';

describe('Test expire command', () => {
  it('should set expiry on key in seconds', () => {
    const redis = new MockRedis({ mykey: 'value' });
    expect((<any>redis).expire('mykey', 10)).toBe(1);
    expect(redis.ttl('mykey')).toBeLessThanOrEqual(10);
  });

  it('should return 0 if key does not exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).expire('mykey', 10)).toBe(0);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['expire'] = expire.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  ttl(key: string) {
    return Math.ceil((this.expires.get(key) - Date.now()) / 1000);
  }
}
