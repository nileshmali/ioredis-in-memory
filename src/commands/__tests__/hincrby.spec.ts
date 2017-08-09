import Store from '../../Store';
import Expires from '../../Expires';
import { hincrby } from '../hincrby';

describe('Test hincrby command', () => {
  it('should increment field value', () => {
    const redis = new MockRedis({ myhash: { field: '5' } });
    expect((<any>redis).hincrby('myhash', 'field', 1)).toBe(6);
    expect((<any>redis).hincrby('myhash', 'field', -2)).toBe(4);
  });

  it('should create hash or field if not exists', () => {
    const redis = new MockRedis({ myhash: {} });
    expect((<any>redis).hincrby('myhash', 'field', 10)).toBe(10);
    expect((<any>redis).hincrby('myhash1', 'field', 10)).toBe(10);
  });

  it('should throw exception if increment not specified', () => {
    const redis = new MockRedis({ myhash: { field: '5' } });
    expect(() => (<any>redis).hincrby('myhash', 'field'))
      .toThrowError('Wrong number of arguments specified');
  });

  it('should throw exception if hash value is not an integer', () => {
    const redis = new MockRedis({ myhash: { field: 'test' } });
    expect(() => (<any>redis).hincrby('myhash', 'field', '10'))
      .toThrowError('Hash value is not an integer');
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hincrby'] = hincrby.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
