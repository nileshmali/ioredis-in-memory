import Store from '../../Store';
import Expires from '../../Expires';
import { hget } from '../hget';

describe('Test hget command', () => {
  it('should get hash value', () => {
    const redis = new MockRedis({ myhash: { field1: 'Hello' } });
    expect((<any>redis).hget('myhash', 'field1')).toBe('Hello');
    expect((<any>redis).hget('myhash', 'field2')).toBeNull();
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hget'] = hget.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
