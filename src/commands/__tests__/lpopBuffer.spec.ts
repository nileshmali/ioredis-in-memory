import Store from '../../Store';
import Expires from '../../Expires';
import { lpop } from '../lpop';
import { lpopBuffer } from '../lpopBuffer';

describe('Test lpopBuffer command', () => {
  it('should return first element from list', () => {
    const redis = new MockRedis();
    redis.set('mylist', [new Buffer('v1'), new Buffer('v2'), new Buffer('v3')]);
    expect((<any>redis).lpopBuffer('mylist')).toBeInstanceOf(Buffer);
    expect(redis.get('mylist')).toHaveLength(2);
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['lpop'] = lpop.bind(this);
    (<any>this)['lpopBuffer'] = lpopBuffer.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
