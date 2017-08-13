import Store from '../../Store';
import Expires from '../../Expires';
import { hstrlen } from '../hstrlen';

describe('Test hstrlen command', () => {
  it('should return hash value length', () => {
    const redis = new MockRedis({ myhash: { field1: 'Hello', field2: 'World' } });
    expect((<any>redis).hstrlen('myhash', 'field1')).toBe(5);
    expect((<any>redis).hstrlen('myhash', 'nosuchfield')).toEqual(0);
    expect((<any>redis).hstrlen('nosuchkey', 'nosuchfield')).toEqual(0);
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hstrlen'] = hstrlen.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
