import Store from '../../Store';
import Expires from '../../Expires';
import { incrbyfloat } from '../incrbyfloat';

describe('Test incrbyfloat command', () => {
  it('should return same value if increment not specified', () => {
    const redis = new MockRedis();
    redis.set('myKey', '10.5');
    expect((<any>redis).incrbyfloat('myKey')).toBe('10.5');
  });
  it('should increment value by 2.5', () => {
    const redis = new MockRedis();
    redis.set('myKey', '10');
    expect((<any>redis).incrbyfloat('myKey', 2.5)).toBe('12.5');
  });
  it('should create key and increment value if not exist', () => {
    const redis = new MockRedis();
    expect((<any>redis).incrbyfloat('myKey', 1.5)).toBe('1.5');
  });
  it('should throw exception if value is not an integer', () => {
    const redis = new MockRedis();
    redis.set('myKey', 'a');
    expect(() => { (<any>redis).incrbyfloat('myKey'); })
      .toThrowError('Value for myKey is not an integer.');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['incrbyfloat'] = incrbyfloat.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
