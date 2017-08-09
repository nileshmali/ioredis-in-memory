import Store from '../../Store';
import Expires from '../../Expires';
import { hmset } from '../hmset';

describe('Test hmset command', () => {
  it('should set hash values', () => {
    const redis = new MockRedis();
    expect((<any>redis).hmset('myhash', 'field1', 'Hello', 'field2', 'World')).toBe('OK');
    expect(redis.get('myhash')).toEqual({ field1: 'Hello', field2: 'World' });
  });
  it('should overwrite if hash value already exists', () => {
    const redis = new MockRedis({ myhash: { field1: 'value1', field2: 'value2' } });
    expect((<any>redis).hmset('myhash', 'field1', 'Hello', 'field2', 'World')).toBe('OK');
    expect(redis.get('myhash')).toEqual({ field1: 'Hello', field2: 'World' });
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hmset'] = hmset.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
