import Store from '../../Store';
import Expires from '../../Expires';
import { append } from '../append';

describe('Test append command', () => {
  it('should append value', () => {
    const redis = new MockRedis();
    redis.set('myKey', 'val');
    expect((<any>redis).append('myKey', 'ue')).toBe(5);
    expect(redis.get('myKey')).toBe('value');
  });
  it('should create key if not exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).append('myKey', 'val')).toBe(3);
    expect(redis.get('myKey')).toBe('val');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['append'] = append.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
