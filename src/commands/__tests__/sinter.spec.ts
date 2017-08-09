import Store from '../../Store';
import Expires from '../../Expires';
import { sunion } from '../sunion';
import { sinter } from '../sinter';

describe('Test sinter command', () => {
  it('should return intersection of sets', () => {
    const redis = new MockRedis({
      key1: new Set(['a', 'b', 'c', 'd']),
      key2: new Set(['c']),
      key3: new Set(['a', 'c', 'e']),
    });
    expect((<any>redis).sinter('key1', 'key2', 'key3'))
      .toEqual(['c']);
  });

  it('should return intersection of sets', () => {
    const redis = new MockRedis({
      key1: new Set(['a', 'b', 'c', 'd']),
      key2: new Set(['c']),
    });
    expect((<any>redis).sinter('key1', 'key2', 'key3'))
      .toEqual([]);
  });

  it('should throw if key does not contain a Set', () => {
    const redis = new MockRedis({
      key1: new Set(['a', 'b', 'c']),
      key3: ['c', 'd', 'e'],
    });
    expect(() => (<any>redis).sinter('key1', 'key2', 'key3'))
      .toThrowError('Key key3 does not contain a set');
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['sunion'] = sunion.bind(this);
    (<any>this)['sinter'] = sinter.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
