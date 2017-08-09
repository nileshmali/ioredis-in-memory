import Store from '../../Store';
import Expires from '../../Expires';
import { rename } from '../rename';
import { renamenx } from '../renamenx';

describe('Test renamenx command', () => {
  it('should rename a key only if target key does not exists', () => {
    const redis = new MockRedis({
      oldKey: 'test'
    });
    expect((<any>redis).renamenx('oldKey', 'newKey')).toBe(1);
    expect(redis.get('oldKey')).toBeNull();
    expect(redis.get('newKey')).toBe('test');
  });

  it('should return 0 if new key already exists', () => {
    const redis = new MockRedis({
      oldKey: 'test',
      newKey: 'test1',
    });
    expect((<any>redis).renamenx('oldKey', 'newKey')).toBe(0);
  });

});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['rename'] = rename.bind(this);
    (<any>this)['renamenx'] = renamenx.bind(this);
  }

  get(key: string) {
    return this.data.get(key);
  }

}
