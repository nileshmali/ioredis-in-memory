import Store from '../../Store';
import Expires from '../../Expires';
import { spop } from '../spop';

describe('Test spop command', () => {
  it('should return random element and remove that from set', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two', 'three']),
    });
    expect((<any>redis).spop('myset')).not.toBeInstanceOf(Array);
    expect(redis.get('myset').size).toBe(2);
  });

  it('should return random elements array and remove them from set', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two', 'three', 'four', 'five', 'six']),
      notset: ['one', 'two'],
    });
    const result = (<any>redis).spop('myset', 2);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(redis.get('myset').size).toBe(4);
  });

  it('should return and remove all elements if set size is less that count', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two', 'three']),
    });
    const result = (<any>redis).spop('myset', 5);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);
    expect(redis.get('myset').size).toBe(0);
  });

  it('should throw error if typeof value is not set', () => {
    const redis = new MockRedis({
      notset: ['one', 'two'],
    });
    expect(() => (<any>redis).spop('notset')).toThrowError('Key notset does not contain a set');
  });

  it('should return null if set is empty or not exist', () => {
    const redis = new MockRedis({
      myset: new Set(),
    });
    expect((<any>redis).spop('myset')).toBeNull();
    expect((<any>redis).spop('mynewset')).toBeNull();
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['spop'] = spop.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
