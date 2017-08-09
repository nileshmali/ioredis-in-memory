import Store from '../../Store';
import Expires from '../../Expires';
import { lindex } from '../lindex';

describe('Test lindex command', () => {
  it('should return element at index', () => {
    const redis = new MockRedis({ mylist: ['Hello', 'World'] });
    expect((<any>redis).lindex('mylist', 0)).toBe('Hello');
    expect((<any>redis).lindex('mylist', -1)).toBe('World');
    expect((<any>redis).lindex('mylist', 3)).toBeNull();
    expect((<any>redis).lindex('mylist1', 3)).toBeNull();
  });

  it('should throw if key does not contain list', () => {
    const redis = new MockRedis({ mylist: 'Hi' });
    expect(() => (<any>redis).lindex('mylist', 0))
      .toThrowError('Key mylist does not contain a list');
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['lindex'] = lindex.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
