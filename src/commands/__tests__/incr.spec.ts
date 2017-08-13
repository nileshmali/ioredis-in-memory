import Store from '../../Store';
import Expires from '../../Expires';
import { incrby } from '../incrby';
import { incr } from '../incr';

describe('Test incr command', () => {
  it('should increment value', () => {
    const redis = new MockRedis();
    redis.set('myKey', '10');
    expect((<any>redis).incr('myKey')).toBe(11);
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['incrby'] = incrby.bind(this);
    (<any>this)['incr'] = incr.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
