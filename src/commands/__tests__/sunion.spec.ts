import Store from '../../Store';
import Expires from '../../Expires';
import { sunion } from '../sunion';

describe('Test sunion command', () => {
  it('should return union of sets', () => {
    const redis = new MockRedis({
      key1: new Set(['a', 'b', 'c']),
      key2: new Set(['c', 'd', 'e']),
    });
    expect((<any>redis).sunion('key1', 'key2', 'key3'))
      .toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('should throw if key does not contain a Set', () => {
    const redis = new MockRedis({
      key1: new Set(['a', 'b', 'c']),
      key2: ['c', 'd', 'e'],
    });
    expect(() => (<any>redis).sunion('key1', 'key2', 'key3'))
      .toThrowError('Key key2 does not contain a set');
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['sunion'] = sunion.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
