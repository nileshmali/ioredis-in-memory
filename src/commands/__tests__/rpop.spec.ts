import Store from '../../Store';
import Expires from '../../Expires';
import { rpop } from '../rpop';

describe('Test rpop command', () => {
  it('should return last value from list', () => {
    const redis = new MockRedis();
    redis.set('mylist', ['v1', 'v2', 'v3']);
    expect((<any>redis).rpop('mylist')).toBe('v3');
    expect(redis.get('mylist')).toHaveLength(2);
  });

  it('should return null value if key does not exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).rpop('mylist')).toBeNull();
  });

  it('should throw if value is not an Array', () => {
    const redis = new MockRedis();
    redis.set('mylist', 'v1');
    expect(() => (<any>redis).rpop('mylist', 'v2'))
      .toThrowError('Key mylist does not contain a list');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['rpop'] = rpop.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
