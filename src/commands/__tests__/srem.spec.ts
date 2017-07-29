import Store from '../../Store';
import Expires from '../../Expires';
import { srem } from '../srem';

describe('Test srem command', () => {
  it('should remove elements from set', () => {
    const redis = new MockRedis({
      myset: new Set(['a', 'b', 'c', 'd']),
    });
    expect((<any>redis).srem('myset', 'b', 'c', 'd', 'e')).toBe(3);
    expect(redis.get('myset').size).toBe(1);
  });

  it('should return 0 if key does not exist', () => {
    const redis = new MockRedis();
    expect((<any>redis).srem('myset', 'b', 'c', 'd', 'e')).toBe(0);
  });

  it('should throw if key does not contain a Set', () => {
    const redis = new MockRedis({
      myset: 'value',
    });
    expect(() => (<any>redis).srem('myset', 'value'))
      .toThrowError('Key myset does not contain a set');
  });

});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['srem'] = srem.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
