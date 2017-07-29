import Store from '../../Store';
import Expires from '../../Expires';
import { lrem } from '../lrem';

describe('Test lrem command', () => {
  it('should remove first two matching elements from list', () => {
    const redis = new MockRedis();
    redis.set('mylist', ['one', 'one', 'two', 'one']);
    expect((<any>redis).lrem('mylist', 2, 'one')).toBe(2);
    expect(redis.get('mylist')).toHaveLength(2);
    expect(redis.get('mylist')).toEqual(['two', 'one']);
  });

  it('should remove last two matching elements from list', () => {
    const redis = new MockRedis();
    redis.set('mylist', ['one', 'one', 'two', 'one']);
    expect((<any>redis).lrem('mylist', -2, 'one')).toBe(2);
    expect(redis.get('mylist')).toHaveLength(2);
    expect(redis.get('mylist')).toEqual(['one', 'two']);
  });

   it('should remove all matching elements from list', () => {
    const redis = new MockRedis();
    redis.set('mylist', ['one', 'one', 'two', 'one']);
    expect((<any>redis).lrem('mylist', 0, 'one')).toBe(3);
    expect(redis.get('mylist')).toHaveLength(1);
    expect(redis.get('mylist')).toEqual(['two']);
  });

  it('should throw if value is not a list', () => {
    const redis = new MockRedis();
    redis.set('mylist', 'one');
    expect(() => (<any>redis).lrem('mylist', -2, 'one'))
      .toThrowError('Key mylist does not contain a list');
  });

  it('should return 0 if key does not exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).lrem('mylist', -2, 'one')).toBe(0);
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['lrem'] = lrem.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
