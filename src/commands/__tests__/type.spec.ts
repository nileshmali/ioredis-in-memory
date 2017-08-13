import Store from '../../Store';
import Expires from '../../Expires';
import { type } from '../type';

describe('Test type command', () => {
  it('should return correct type', () => {
    const redis = new MockRedis();
    redis.set('mylist', [1, 2, 3]);
    redis.set('myset', new Set([1, 2, 3]));
    redis.set('mystring', 'value');
    redis.set('mynumber', 1);
    redis.set('myhash', { 'key': 'value' });
    expect((<any>redis).type('mylist')).toBe('list');
    expect((<any>redis).type('myset')).toBe('set');
    expect((<any>redis).type('mystring')).toBe('string');
    expect((<any>redis).type('myhash')).toBe('hash');
    expect((<any>redis).type('notakey')).toBe('none');
    expect((<any>redis).type('mynumber')).toBe('none');
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires());
    (<any>this)['type'] = type.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
