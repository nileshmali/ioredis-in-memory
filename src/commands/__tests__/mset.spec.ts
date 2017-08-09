import Store from '../../Store';
import Expires from '../../Expires';
import { mset } from '../mset';

describe('Test mset command', () => {
  it('should set value for key', () => {
    const redis = new MockRedis();
    expect((<any>redis).mset('key1', 'hello', 'key2', 'there')).toBe('OK');
    expect(redis.get('key2')).toBe('there');
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['mset'] = mset.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
