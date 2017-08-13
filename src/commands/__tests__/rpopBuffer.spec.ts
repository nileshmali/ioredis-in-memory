import Store from '../../Store';
import Expires from '../../Expires';
import { rpop } from '../rpop';
import { rpopBuffer } from '../rpopBuffer';


describe('Test rpopBuffer command', () => {
  it('should return last value from list', () => {
    const redis = new MockRedis();
    redis.set('mylist', [new Buffer('v1'), new Buffer('v2'), new Buffer('v3')]);
    expect((<any>redis).rpopBuffer('mylist')).toBeInstanceOf(Buffer);
    expect(redis.get('mylist')).toHaveLength(2);
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['rpop'] = rpop.bind(this);
    (<any>this)['rpopBuffer'] = rpopBuffer.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
