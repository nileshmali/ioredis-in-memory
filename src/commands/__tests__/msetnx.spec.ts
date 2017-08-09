import Store from '../../Store';
import Expires from '../../Expires';
import { msetnx } from '../msetnx';

describe('Test msetnx command', () => {
  it('should set value for key', () => {
    const redis = new MockRedis();
    expect((<any>redis).msetnx('key1', 'hello', 'key2', 'there')).toBe(1);
  });
  it('should do nothing if any key already exists', () => {
    const redis = new MockRedis({ key2: 'there' });
    expect((<any>redis).msetnx('key2', 'there', 'key3', 'world')).toBe(0);
    expect(redis.get('key3')).toBeNull();
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['msetnx'] = msetnx.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
