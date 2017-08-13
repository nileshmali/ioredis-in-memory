import Store from '../../Store';
import Expires from '../../Expires';
import { rpoplpush } from '../rpoplpush';
import { brpoplpush } from '../brpoplpush';

describe('Test brpoplpush command', () => {
  it('should pop from right and push to left in another list', () => {
    const redis = new MockRedis();
    redis.set('mylist', ['one', 'two', 'three']);
    redis.set('myotherlist', ['four']);
    expect((<any>redis).brpoplpush('mylist', 'myotherlist')).toBe('three');
    expect(redis.get('mylist')).toHaveLength(2);
    expect(redis.get('myotherlist')[0]).toBe('three');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['rpoplpush'] = rpoplpush.bind(this);
    (<any>this)['brpoplpush'] = brpoplpush.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
