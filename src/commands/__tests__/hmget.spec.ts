import Store from '../../Store';
import Expires from '../../Expires';
import { hmget } from '../hmget';

describe('Test hmget command', () => {
  it('should get hash values', () => {
    const redis = new MockRedis({ myhash: { field1: 'Hello', field2: 'World' } });
    expect((<any>redis).hmget('myhash', 'field1', 'field2', 'field3'))
      .toEqual(['Hello', 'World', null]);
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hmget'] = hmget.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
