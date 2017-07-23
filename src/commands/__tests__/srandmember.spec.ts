import Store from '../../Store';
import Expires from '../../Expires';
import { srandmember } from '../srandmember';

describe('Test srandmember command', () => {
  it('should return random element from set', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two', 'three']),
    });
    expect((<any>redis).srandmember('myset')).not.toBeInstanceOf(Array);
    expect(redis.get('myset').size).toBe(3);
  });

  it('should return random elements array from set', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two', 'three', 'four', 'five', 'six']),
    });
    const result = (<any>redis).srandmember('myset', 2);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(redis.get('myset').size).toBe(6);
  });

  it('should return all elements if set size is less that count', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two', 'three']),
    });
    const result = (<any>redis).srandmember('myset', 5);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);
    expect(redis.get('myset').size).toBe(3);
  });

  it('should throw error if typeof value is not set', () => {
    const redis = new MockRedis({
      notset: ['one', 'two'],
    });
    expect(() => (<any>redis).srandmember('notset')).toThrowError('Key notset does not contain a set');
  });

  it('should return null if set is empty or not exist', () => {
    const redis = new MockRedis({
      myset: new Set(),
    });
    expect((<any>redis).srandmember('myset')).toBeNull();
    expect((<any>redis).srandmember('mynewset')).toBeNull();
  });

  it('should return repeated elements if count is negative', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two', 'three']),
    });
    const result = (<any>redis).srandmember('myset', -5);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(5);
    expect(redis.get('myset').size).toBe(3);
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['srandmember'] = srandmember.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
