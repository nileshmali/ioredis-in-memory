import Store from '../../Store';
import Expires from '../../Expires';
import { hset } from '../hset';

describe('Test hset command', () => {
  it('should set hash value', () => {
    const redis = new MockRedis();
    expect((<any>redis).hset('myhash', 'field', 'Hello')).toBe(1);
    expect(redis.get('myhash')).toEqual({ field: 'Hello' });
  });
  it('should overwrite and return 0 if hash value already exists', () => {
    const redis = new MockRedis({ myhash: { field: 'Hello' } });
    expect((<any>redis).hset('myhash', 'field', 'World')).toBe(0);
    expect(redis.get('myhash')).toEqual({ field: 'World' });
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hset'] = hset.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
