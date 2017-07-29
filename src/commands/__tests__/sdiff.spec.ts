import Store from '../../Store';
import Expires from '../../Expires';
import { sdiff } from '../sdiff';

describe('Test sdiff command', () => {
  it('should return diff between sets', () => {
    const redis = new MockRedis({
      key1: new Set(['a', 'b', 'c', 'd']),
      key2: new Set(['c']),
      key3: new Set(['a', 'c', 'e']),
    });
    expect((<any>redis).sdiff('key1', 'key2', 'key3')).toEqual(['b', 'd']);
  });

  it('should throw if ours is not Set', () => {
    const redis = new MockRedis({
      key1: ['a', 'b', 'c', 'd'],
    });
    expect(() => (<any>redis).sdiff('key1', 'key2', 'key3'))
      .toThrowError('Key key1 does not contain a set');
  });

  it('should throw if theirs is not Set', () => {
    const redis = new MockRedis({
      key1: new Set(['a', 'b', 'c', 'd']),
      key2: ['c'],
    });
    expect(() => (<any>redis).sdiff('key1', 'key2', 'key3'))
      .toThrowError('Key key2 does not contain a set');
  });

  it('should treat non-existant keys as empty sets', () => {
    const redis = new MockRedis();
    expect((<any>redis).sdiff('key1', 'key2', 'key3')).toEqual([]);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['sdiff'] = sdiff.bind(this);
  }

  get(key: string) {
    return this.data.get(key);
  }

  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
