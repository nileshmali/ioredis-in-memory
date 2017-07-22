import Store from '../../Store';
import Expires from '../../Expires';
import { dbsize } from '../dbsize';

describe('Test dbsize command', () => {
  it('should return number of keys', () => {
    const redis = new MockRedis();
    expect((<any>redis).dbsize()).toBe(0);
    redis.set('myKey', 'val');
    redis.set('myKey1', 'val');
    redis.set('myKey2', 'val');
    expect((<any>redis).dbsize()).toBe(3);
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['dbsize'] = dbsize.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
