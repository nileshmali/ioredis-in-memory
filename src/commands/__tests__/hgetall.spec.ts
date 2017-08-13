import Store from '../../Store';
import Expires from '../../Expires';
import { hgetall } from '../hgetall';

describe('Test hgetall command', () => {
  it('should get value', () => {
    const redis = new MockRedis({ myhash: { field1: 'Hello', field2: 'World' } });
    expect((<any>redis).hgetall('myhash')).toEqual({ field1: 'Hello', field2: 'World' });
    expect((<any>redis).hgetall('nosuchkey')).toEqual({});
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hgetall'] = hgetall.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
