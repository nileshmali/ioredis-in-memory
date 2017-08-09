import Store from '../../Store';
import Expires from '../../Expires';
import { hincrbyfloat } from '../hincrbyfloat';

describe('Test hincrbyfloat command', () => {
  it('should increment field value', () => {
    const redis = new MockRedis({ myhash: { field: '5.5' } });
    expect((<any>redis).hincrbyfloat('myhash', 'field', 1.5)).toBe('7');
    expect((<any>redis).hincrbyfloat('myhash', 'field', -2.5)).toBe('4.5');
  });

  it('should create hash or field if not exists', () => {
    const redis = new MockRedis({ myhash: {} });
    expect((<any>redis).hincrbyfloat('myhash', 'field', 10.5)).toBe('10.5');
    expect((<any>redis).hincrbyfloat('myhash1', 'field', 10.5)).toBe('10.5');
  });

  it('should throw exception if increment not specified', () => {
    const redis = new MockRedis({ myhash: { field: '5.5' } });
    expect(() => (<any>redis).hincrbyfloat('myhash', 'field'))
      .toThrowError('Wrong number of arguments specified');
  });

  it('should throw exception if hash value is not a number', () => {
    const redis = new MockRedis({ myhash: { field: 'test' } });
    expect(() => (<any>redis).hincrbyfloat('myhash', 'field', '10.5'))
      .toThrowError('Hash value is not a number');
  });
});

class MockRedis {
  private data: Store;
  constructor(initial = {}) {
    this.data = new Store(new Expires(), initial);
    (<any>this)['hincrbyfloat'] = hincrbyfloat.bind(this);
  }
  set(key: string, value: any) {
    return this.data.set(key, value);
  }
}
