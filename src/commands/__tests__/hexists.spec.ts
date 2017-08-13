import Store from '../../Store';
import Expires from '../../Expires';
import { hexists } from '../hexists';

describe('Test hexists command', () => {
  it('should check key existance', () => {
    const redis = new MockRedis({ myhash: { field1: 'Hello', field2: 'World' } });
    expect((<any>redis).hexists('myhash', 'field1')).toBe(1);
    expect((<any>redis).hexists('myhash', 'nosuchfield')).toEqual(0);
    expect((<any>redis).hexists('nosuchkey', 'nosuchfield')).toEqual(0);
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hexists'] = hexists.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
