import Store from '../../Store';
import Expires from '../../Expires';
import { scard } from '../scard';

describe('Test scard command', () => {
  it('should return cardinality of set', () => {
    const redis = new MockRedis({ myset: new Set(['1', '2', '3']) });
    expect((<any>redis).scard('myset')).toBe(3);
    expect((<any>redis).scard('myset1')).toBe(0);
  });

  it('should throw if value is not a Set', () => {
    const redis = new MockRedis({
      myset: 'value'
    });
    expect(() => (<any>redis).scard('myset'))
      .toThrowError('Key myset does not contain a set');

  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['scard'] = scard.bind(this);
  }

  get(key: string) {
    return this.data.get(key);
  }

  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
