import Store from '../../Store';
import Expires from '../../Expires';
import { lpush } from '../lpush';
import { lpushx } from '../lpushx';

describe('Test lpushx command', () => {
  it('should prepend values to list', () => {
    const redis = new MockRedis();
    redis.set('mylist', []);
    expect((<any>redis).lpushx('mylist', 'v1')).toBe(1);
    expect((<any>redis).lpushx('mylist1', 'v2')).toBe(0);
    expect(redis.get('mylist1')).toBeNull();
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['lpush'] = lpush.bind(this);
    (<any>this)['lpushx'] = lpushx.bind(this);
  }
  get(key: string) {
    return this.data.get(key) || null;
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
