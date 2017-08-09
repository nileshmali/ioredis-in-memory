import Store from '../../Store';
import Expires from '../../Expires';
import { hvals } from '../hvals';

describe('Test hvals command', () => {
  it('should get all hash values', () => {
    const redis = new MockRedis({ myhash: { field1: 'Hello', field2: 'World' } });
    expect((<any>redis).hvals('myhash')).toEqual(['Hello', 'World']);
    expect((<any>redis).hvals('myhash1')).toEqual([]);
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hvals'] = hvals.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
