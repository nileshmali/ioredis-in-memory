import Store from '../../Store';
import Expires from '../../Expires';
import { mget } from '../mget';

describe('Test mget command', () => {
  it('should return values of all specified keys', () => {
    const redis = new MockRedis({ key1: 'Hello', key2: 'World' });
    expect((<any>redis).mget('key1', 'key2', 'nosuchkey'))
      .toEqual(['Hello', 'World', null]);
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['mget'] = mget.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
