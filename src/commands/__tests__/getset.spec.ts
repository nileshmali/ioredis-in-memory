import Store from '../../Store';
import Expires from '../../Expires';
import { getset } from '../getset';

describe('Test getset command', () => {
  it('should get and set value', () => {
    const redis = new MockRedis({ mykey: 'Hello' });
    expect((<any>redis).getset('mykey', 'World')).toBe('Hello');
    expect(redis.get('mykey')).toBe('World');
    expect((<any>redis).getset('mykey1', 'World')).toBeNull();
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['getset'] = getset.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
