import Store from '../../Store';
import Expires from '../../Expires';
import { sismember } from '../sismember';

describe('Test sismember command', () => {
  it('should check whether value is member of set', () => {
    const redis = new MockRedis({
      myset: new Set(['a', 'b', 'c']),
    });
    expect((<any>redis).sismember('myset', 'a')).toBe(1);
    expect((<any>redis).sismember('myset', 'd')).toBe(0);
    expect((<any>redis).sismember('nosuchkey', 'a')).toBe(0);
  });

  it('should throw if key does not contain a Set', () => {
    const redis = new MockRedis({
      myset: ['c', 'd', 'e'],
    });
    expect(() => (<any>redis).sismember('myset', 'c'))
      .toThrowError('Key myset does not contain a set');
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['sismember'] = sismember.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
