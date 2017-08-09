import Store from '../../Store';
import Expires from '../../Expires';
import { setnx } from '../setnx';

describe('Test setnx command', () => {
  it('should only set if key does not exists', () => {
    const redis = new MockRedis({ mykey: 'value' });
    expect((<any>redis).setnx('mykey1', 'value')).toBe(1);
    expect((<any>redis).setnx('mykey', 'value')).toBe(0);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['setnx'] = setnx.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }

}
