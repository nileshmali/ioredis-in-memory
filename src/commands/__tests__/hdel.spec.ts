import Store from '../../Store';
import Expires from '../../Expires';
import { hdel } from '../hdel';

describe('Test hdel command', () => {
  it('should return number of fields deleted', () => {
    const redis = new MockRedis({
      'myhash': { field1: 'val1', field2: 'val2' },
    });
    expect((<any>redis).hdel('nohash', 'field1')).toBe(0);
    expect((<any>redis).hdel('myhash', 'field3')).toBe(0);
    expect((<any>redis).hdel('myhash', 'field1', 'field2')).toBe(2);
    expect(() => (<any>redis).hdel()).toThrowError('Wrong number of arguments.');
    expect(() => (<any>redis).hdel('myhash')).toThrowError('Wrong number of arguments.');
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hdel'] = hdel.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
