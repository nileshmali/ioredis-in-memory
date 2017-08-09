import Store from '../../Store';
import Expires from '../../Expires';
import { hsetnx } from '../hsetnx';

describe('Test hsetnx command', () => {
  it('should set hash value', () => {
    const redis = new MockRedis();
    expect((<any>redis).hsetnx('myhash', 'field', 'Hello')).toBe(1);
  });
  it('should do nothing if hash value already exists', () => {
    const redis = new MockRedis({ myhash: { field: 'Hello' } });
    expect((<any>redis).hsetnx('myhash', 'field', 'World')).toBe(0);
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hsetnx'] = hsetnx.bind(this);
  }
}
