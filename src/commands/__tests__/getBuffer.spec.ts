import Store from '../../Store';
import Expires from '../../Expires';
import { getBuffer } from '../getBuffer';

describe('Test getBuffer command', () => {
  it('should getBuffer value', () => {
    const redis = new MockRedis({ mykey: new Buffer('Hello') });
    expect((<any>redis).getBuffer('mykey')).toBeInstanceOf(Buffer);
    expect((<any>redis).getBuffer('nosuchkey')).toBeNull();
  });

});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['getBuffer'] = getBuffer.bind(this);
  }
}
