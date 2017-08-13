import Store from '../../Store';
import Expires from '../../Expires';
import { rpoplpush } from '../rpoplpush';
import { rpoplpushBuffer } from '../rpoplpushBuffer';

describe('Test rpoplpushBuffer command', () => {
  it('should pop from right and push to left in another list', () => {
    const redis = new MockRedis();
    redis.set('mylist', [new Buffer('one'), new Buffer('two')]);
    redis.set('myotherlist', [new Buffer('four')]);
    expect((<any>redis).rpoplpushBuffer('mylist', 'myotherlist'))
      .toBeInstanceOf(Buffer);
    expect(redis.get('mylist')).toHaveLength(1);
    expect(redis.get('myotherlist')[0]).toBeInstanceOf(Buffer);
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['rpoplpush'] = rpoplpush.bind(this);
    (<any>this)['rpoplpushBuffer'] = rpoplpushBuffer.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
