import Store from '../../Store';
import Expires from '../../Expires';
import { smembers } from '../smembers';

describe('Test smembers command', () => {
  it('should return members of set', () => {
    const redis = new MockRedis({
      myset: new Set(['a', 'b', 'c']),
    });
    expect((<any>redis).smembers('myset')).toEqual(['a', 'b', 'c']);
    expect((<any>redis).smembers('nosuchkey')).toEqual([]);
  });

  it('should throw if key does not contain a Set', () => {
    const redis = new MockRedis({
      myset: ['c', 'd', 'e'],
    });
    expect(() => (<any>redis).smembers('myset'))
      .toThrowError('Key myset does not contain a set');
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['smembers'] = smembers.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
