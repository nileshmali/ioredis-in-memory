import Store from '../../Store';
import Expires from '../../Expires';
import { rpoplpush } from '../rpoplpush';

describe('Test rpoplpush command', () => {
  it('should pop and push to another list', () => {
    const redis = new MockRedis();
    redis.set('mylist', ['one', 'two', 'three']);
    expect((<any>redis).rpoplpush('mylist', 'myotherlist')).toBe('three');
    expect(redis.get('mylist')).toHaveLength(2);
  });

  it('should pop from right and push to left in another list', () => {
    const redis = new MockRedis();
    redis.set('mylist', ['one', 'two', 'three']);
    redis.set('myotherlist', ['four']);
    expect((<any>redis).rpoplpush('mylist', 'myotherlist')).toBe('three');
    expect(redis.get('mylist')).toHaveLength(2);
    expect(redis.get('myotherlist')[0]).toBe('three');
  });

  it('should return null if source is empty', () => {
    const redis = new MockRedis();
    redis.set('mylist', []);
    expect((<any>redis).rpoplpush('mylist', 'myotherlist')).toBeNull();
  });

  it('should throw if source is not a list', () => {
    const redis = new MockRedis();
    redis.set('mylist', 'abc');
    expect(() => (<any>redis).rpoplpush('mylist', 'myotherlist'))
      .toThrowError('Key mylist does not contain a list');
  });

  it('should throw if destination is not a list', () => {
    const redis = new MockRedis();
    redis.set('mylist', []);
    redis.set('myotherlist', 'abc');
    expect(() => (<any>redis).rpoplpush('mylist', 'myotherlist'))
      .toThrowError('Key myotherlist does not contain a list');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['rpoplpush'] = rpoplpush.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
