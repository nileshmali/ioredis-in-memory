import Store from '../../Store';
import Expires from '../../Expires';
import { hkeys } from '../hkeys';

describe('Test hkeys command', () => {
  it('should return all keys', () => {
    const redis = new MockRedis({ myhash: { field1: 'Hello', field2: 'World' } });
    expect((<any>redis).hkeys('myhash')).toEqual(['field1', 'field2']);
    expect((<any>redis).hkeys('nosuchkey')).toEqual([]);
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hkeys'] = hkeys.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
