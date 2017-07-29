import Store from '../../Store';
import Expires from '../../Expires';
import { rename } from '../rename';

describe('Test rename command', () => {
  it('should rename a key', () => {
    const redis = new MockRedis({
      oldKey: 'test'
    });
    expect((<any>redis).rename('oldKey', 'newKey')).toBe('OK');
    expect(redis.get('oldKey')).toBeNull();
    expect(redis.get('newKey')).toBe('test');
  });

  it('should throw if key doesn\'t exists', () => {
    const redis = new MockRedis();
    expect(() => (<any>redis).rename('oldKey', 'newKey'))
      .toThrowError('No such a key');
  });

  it('should preserve expires after rename', () => {
    const redis = new MockRedis();
    redis.set('oldKey', 'test');
    const expVal = Date.now() + 1000000;
    redis.expire('oldKey', expVal);
    expect((<any>redis).rename('oldKey', 'newKey')).toBe('OK');
    expect(redis.get('oldKey')).toBeNull();
    expect(redis.get('newKey')).toBe('test');
    expect(redis.getExpire('oldKey')).toBeNull();
    expect(redis.getExpire('newKey')).toBe(expVal);
  });

});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['rename'] = rename.bind(this);
  }

  get(key: string) {
    return this.data.get(key);
  }

  set(key: string, value: any) {
    return this.data.set(key, value);
  }

  expire(key: string, value: number) {
    return this.expires.set(key, value);
  }

  getExpire(key: string) {
    return this.expires.get(key) || null;
  }
}
