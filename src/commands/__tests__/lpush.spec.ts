import Store from '../../Store';
import Expires from '../../Expires';
import { lpush } from '../lpush';

describe('Test lpush command', () => {
  it('should prepend values to list', () => {
    const redis = new MockRedis();
    expect((<any>redis).lpush('mylist', 'v1')).toBe(1);
    expect((<any>redis).lpush('mylist', 'v2', 'v3')).toBe(3);
    expect(redis.get('mylist')[0]).toEqual('v3');
    expect(redis.get('mylist')).toBeInstanceOf(Array);
    expect(redis.get('mylist')).toHaveLength(3);
  });

  it('should throw if value is not an Array', () => {
    const redis = new MockRedis();
    redis.set('mylist', 'v1');
    expect(() => (<any>redis).lpush('mylist', 'v2'))
      .toThrowError('Key mylist does not contain a list');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['lpush'] = lpush.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
