import Store from '../../Store';
import Expires from '../../Expires';
import { smove } from '../smove';

describe('Test smove command', () => {
  it('should move element from source to destination', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two']),
      myotherset: new Set(['three']),
    });
    expect((<any>redis).smove('myset', 'myotherset', 'two'))
      .toBe(1);
    expect(redis.get('myset').size).toBe(1);
    expect(redis.get('myotherset').size).toBe(2);
  });

  it('should throw if source is not instance of Set', () => {
    const redis = new MockRedis({
      myset: ['one', 'two'],
    });
    expect(() => (<any>redis).smove('myset', 'myotherset', 'two'))
      .toThrowError('Key myset does not contain a set');

  });

  it('should throw if destination is not instance of Set', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two']),
      myotherset: ['three'],
    });
    expect(() => (<any>redis).smove('myset', 'myotherset', 'two'))
      .toThrowError('Key myotherset does not contain a set');
  });

  it('should return 0 if source does not exists', () => {
    const redis = new MockRedis();
    expect((<any>redis).smove('myset', 'myotherset', 'two'))
      .toBe(0);
  });

  it('should return 0 if element does not exists in source set', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two']),
      myotherset: new Set(['three']),
    });
    expect((<any>redis).smove('myset', 'myotherset', 'four'))
      .toBe(0);
  });

  it('should create destination if not exists', () => {
    const redis = new MockRedis({
      myset: new Set(['one', 'two']),
    });
    expect((<any>redis).smove('myset', 'myotherset', 'two'))
      .toBe(1);
    expect(redis.get('myset').size).toBe(1);
    expect(redis.get('myotherset').size).toBe(1);
  });
});

class MockRedis {
  private data: Store;
  private expires: Expires;
  constructor(initial = {}) {
    this.expires = new Expires();
    this.data = new Store(this.expires, initial);
    (<any>this)['smove'] = smove.bind(this);
  }

  get(key: string) {
    return this.data.get(key);
  }

  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
