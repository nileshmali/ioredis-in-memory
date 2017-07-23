import Store from '../../Store';
import Expires from '../../Expires';
import { set } from '../set';

describe('Test set command', () => {
  it('should set value', () => {
    const redis = new MockRedis();
    (<any>redis).set('mykey', 'val');
    expect(redis.get('mykey')).toBe('val');
  });
  it('should expire key after 1 second (EX)', (done) => {
    const redis = new MockRedis();
    (<any>redis).set('mykey', 'val', 'EX', 1);
    expect(redis.get('mykey')).toBe('val');
    setTimeout(() => {
      expect(redis.get('mykey')).toBeNull();
      done();
    }, 1100);
  });
  it('should expire key after 500 milliseconds (PX)', (done) => {
    const redis = new MockRedis();
    (<any>redis).set('mykey', 'val', 'PX', 400);
    expect(redis.get('mykey')).toBe('val');
    setTimeout(() => {
      expect(redis.get('mykey')).toBeNull();
      done();
    }, 600);
  });
  it('should throw if NX and XX both options provided', () => {
    const redis = new MockRedis();
    expect(() => (<any>redis).set('mykey', 'val', 'NX', 'XX'))
      .toThrowError('ERR syntax error.');
  });
  it('should only set if not exists (NX)', () => {
    const redis = new MockRedis();
    expect((<any>redis).set('mykey', 'val', 'NX')).toBe('OK');
    expect((<any>redis).set('mykey', 'val1', 'NX')).toBeNull();
  });
  it('should only set if exists (XX)', () => {
    const redis = new MockRedis();
    expect((<any>redis).set('mykey', 'val', 'XX')).toBeNull();
    (<any>redis).set('mykey', 'val');
    expect((<any>redis).set('mykey', 'val1', 'XX')).toBe('OK');
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor() {
    this.expires = new Expires();
    this.data = new Store(this.expires);
    (<any>this)['set'] = set.bind(this);
  }
  get(key: string) {
    return this.data.get(key);
  }
  expire(key: string, seconds: number) {
    this.expires.set(key, (seconds * 1000) + Date.now());
  }
}
