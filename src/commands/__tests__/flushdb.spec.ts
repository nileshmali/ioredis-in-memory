import Store from '../../Store';
import Expires from '../../Expires';
import { flushdb } from '../flushdb';

describe('Test flushdb command', () => {
  it('should clear database', () => {
    const redis = new MockRedis({ key1: 'key', key2: 'key2' });
    expect((<any>redis).flushdb()).toBe('OK');
    expect(redis.get('key1')).toBeNull();
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['flushdb'] = flushdb.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
