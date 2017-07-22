import Store from '../../Store';
import Expires from '../../Expires';
import { decrby } from '../decrby';

describe('Test decrby command', () => {
  it('should return same value if decrement not specified', () => {
    const redis = new MockRedis();
    redis.set('myKey', '10');
    expect((<any>redis).decrby('myKey')).toBe(10);
  });
  it('should decrement value by 2', () => {
    const redis = new MockRedis();
    redis.set('myKey', '10');
    expect((<any>redis).decrby('myKey', 2)).toBe(8);
  });
  it('should create key and decrement value if not exist', () => {
    const redis = new MockRedis();
    expect((<any>redis).decrby('myKey', 1)).toBe(-1);
  });
  it('should throw exception if value is not an integer', () => {
    const redis = new MockRedis();
    redis.set('myKey', 'a');
    expect(() => { (<any>redis).decrby('myKey'); })
      .toThrowError('Value for myKey is not an integer.');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['decrby'] = decrby.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
