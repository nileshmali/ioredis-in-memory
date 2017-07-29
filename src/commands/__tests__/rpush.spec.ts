import Store from '../../Store';
import Expires from '../../Expires';
import { rpush } from '../rpush';

describe('Test rpush command', () => {
  it('should append values to list', () => {
    const redis = new MockRedis();
    expect((<any>redis).rpush('mylist', 'v1')).toBe(1);
    expect((<any>redis).rpush('mylist', 'v2')).toBe(2);
    expect(redis.get('mylist')).toBeInstanceOf(Array);
    expect(redis.get('mylist')).toHaveLength(2);
  });

  it('should throw if value is not an Array', () => {
    const redis = new MockRedis();
    redis.set('mylist', 'v1');
    expect(() => (<any>redis).rpush('mylist', 'v2'))
      .toThrowError('Key mylist does not contain a list');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['rpush'] = rpush.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
