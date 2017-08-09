import Store from '../../Store';
import Expires from '../../Expires';
import { llen } from '../llen';

describe('Test llen command', () => {
  it('should length of list', () => {
    const redis = new MockRedis({ mylist: ['Hello', 'World'] });
    expect((<any>redis).llen('mylist')).toBe(2);
  });

  it('should throw if key does not contain list', () => {
    const redis = new MockRedis({ mylist: 'Hi' });
    expect(() => (<any>redis).llen('mylist'))
      .toThrowError('Key mylist does not contain a list');
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['llen'] = llen.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
