import Store from '../../Store';
import Expires from '../../Expires';
import { del } from '../del';

describe('Test del command', () => {
  it('should return number of keys deleted', () => {
    const redis = new MockRedis();
    expect((<any>redis).del('key1', 'key2')).toBe(0);
    redis.set('key1', 'val1');
    redis.set('key2', 'val2');
    expect((<any>redis).del('key1', 'key2', 'key3')).toBe(2);
    expect(redis.get('key1')).toBeNull();
    expect(redis.get('key2')).toBeNull();
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['del'] = del.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
