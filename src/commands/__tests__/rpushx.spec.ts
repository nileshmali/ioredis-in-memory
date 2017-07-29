import Store from '../../Store';
import Expires from '../../Expires';
import { rpush } from '../rpush';
import { rpushx } from '../rpushx';

describe('Test rpushx command', () => {
  it('should append value to list if key exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).rpush('mylist', 'v1')).toBe(1);
    expect((<any>redis).rpushx('mylist', 'v2')).toBe(2);
  });

  it('should return 0 if key does not exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).rpushx('mylist', 'v2')).toBe(0);
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['rpush'] = rpush.bind(this);
    (<any>this)['rpushx'] = rpushx.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
