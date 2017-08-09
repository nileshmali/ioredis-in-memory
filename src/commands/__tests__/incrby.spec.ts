import Store from '../../Store';
import Expires from '../../Expires';
import { incrby } from '../incrby';

describe('Test incrby command', () => {
  it('should return same value if increment not specified', () => {
    const redis = new MockRedis();
    redis.set('myKey', '10');
    expect((<any>redis).incrby('myKey')).toBe(10);
  });
  it('should increment value by 2', () => {
    const redis = new MockRedis();
    redis.set('myKey', '10');
    expect((<any>redis).incrby('myKey', 2)).toBe(12);
  });
  it('should create key and increment value if not exist', () => {
    const redis = new MockRedis();
    expect((<any>redis).incrby('myKey', 1)).toBe(1);
  });
  it('should throw exception if value is not an integer', () => {
    const redis = new MockRedis();
    redis.set('myKey', 'a');
    expect(() => { (<any>redis).incrby('myKey'); })
      .toThrowError('Value for myKey is not an integer.');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['incrby'] = incrby.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
