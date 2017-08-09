import Store from '../../Store';
import Expires from '../../Expires';
import { getrange } from '../getrange';

describe('Test getrange command', () => {
  it('should return substring', () => {
    const redis = new MockRedis({
      'mykey': 'This is a string',
    });
    expect((<any>redis).getrange('mykey', 0, 3)).toBe('This');
    expect((<any>redis).getrange('mykey', -3, -1)).toBe('ing');
    expect((<any>redis).getrange('mykey', 0, -1)).toBe('This is a string');
    expect((<any>redis).getrange('mykey', 10, 100)).toBe('string');
    expect((<any>redis).getrange('mykey1', 10, 100)).toBe('');
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['getrange'] = getrange.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
