import Store from '../../Store';
import Expires from '../../Expires';
import { hlen } from '../hlen';

describe('Test hlen command', () => {
  it('should return the number of fields contained in the hash stored at key', () => {
    const redis = new MockRedis({ myhash: { field1: 'Hello', field2: 'World' } });
    expect((<any>redis).hlen('myhash')).toBe(2);
    expect((<any>redis).hlen('nosuchkey')).toBe(0);
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hlen'] = hlen.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
