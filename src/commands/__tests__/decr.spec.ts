import Store from '../../Store';
import Expires from '../../Expires';
import { decrby } from '../decrby';
import { decr } from '../decr';

describe('Test decr command', () => {
  it('should decrement value', () => {
    const redis = new MockRedis();
    redis.set('myKey', '10');
    expect((<any>redis).decr('myKey')).toBe(9);
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['decrby'] = decrby.bind(this);
    (<any>this)['decr'] = decr.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
