import Store from '../../Store';
import Expires from '../../Expires';
import { lpop } from '../lpop';

describe('Test lpop command', () => {
  it('should return first element from list', () => {
    const redis = new MockRedis();
    redis.set('mylist', ['v1', 'v2', 'v3']);
    expect((<any>redis).lpop('mylist')).toBe('v1');
    expect(redis.get('mylist')).toHaveLength(2);
  });

  it('should return null value if key does not exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).lpop('mylist')).toBeNull();
  });

  it('should throw if value is not an Array', () => {
    const redis = new MockRedis();
    redis.set('mylist', 'v1');
    expect(() => (<any>redis).lpop('mylist', 'v2'))
      .toThrowError('Key mylist does not contain a list');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['lpop'] = lpop.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
