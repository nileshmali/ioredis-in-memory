import Store from '../../Store';
import Expires from '../../Expires';
import { randomkey } from '../randomkey';

describe('Test randomkey command', () => {
  it('should return any random key', () => {
    const redis = new MockRedis({ key1: 'Hello', key2: 'World' });
    expect((<any>redis).randomkey()).not.toBeNull();
  });
  it('should return null if database is empty', () => {
    const redis = new MockRedis();
    expect((<any>redis).randomkey()).toBeNull();
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['randomkey'] = randomkey.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
}
