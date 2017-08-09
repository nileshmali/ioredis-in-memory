import Store from '../../Store';
import Expires from '../../Expires';
import { exists } from '../exists';

describe('Test exists command', () => {
  it('should return number of key exists', () => {
    const redis = new MockRedis({ key1: 'Hello', key2: 'World' });
    expect((<any>redis).exists('key1', 'key2', 'nosuchkey')).toBe(2);
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['exists'] = exists.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
