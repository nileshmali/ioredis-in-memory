import Store from '../../Store';
import Expires from '../../Expires';
import { get } from '../get';

describe('Test get command', () => {
  it('should get value', () => {
    const redis = new MockRedis({ mykey: 'Hello' });
    expect((<any>redis).get('mykey')).toBe('Hello');
    expect((<any>redis).get('nosuchkey')).toBeNull();
  });

  it('should throw error if value is not string', () => {
    const redis = new MockRedis({ mykey: { k: 'Hello' } });
    expect(() => (<any>redis).get('mykey'))
      .toThrowError('Key mykey does not contain a string');
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['get'] = get.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
