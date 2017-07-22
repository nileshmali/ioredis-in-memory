import Expires from '../Expires';
import Store from '../Store';

describe('Test Store', () => {
  it('should accept initial data and create store', () => {
    const data = {
      name: 'test1',
      user: {
        user1: { name: 'user1', age: 20 },
        user2: { name: 'user2', age: 30 },
      }
    };
    let store = new Store(new Expires(), data);
    expect(store.get('name')).toEqual('test1');
    expect(store.get('user')).toEqual({
      user1: { name: 'user1', age: 20 },
      user2: { name: 'user2', age: 30 },
    });
  });
  it('should set and get data correctly', () => {
    let store = new Store(new Expires());
    store.set('buffer', Buffer.from(['a', 'b']));
    expect(store.get('buffer')).toBeInstanceOf(Buffer);
    store.set('set', new Set());
    expect(store.get('set')).toBeInstanceOf(Set);
    store.set('array', ['e1']);
    expect(store.get('array')).toBeInstanceOf(Array);
  });
  it('should return has value correctly', () => {
    let store = new Store(new Expires());
    store.set('myKey', 'myValue');
    expect(store.has('myKey')).toBeTruthy();
    expect(store.has('none')).toBeFalsy();
  });
  it('should delete key', () => {
    let expires = new Expires();
    let store = new Store(expires);
    store.set('myKey', 'myValue');
    store.delete('myKey');
    expect(store.get('myKey')).toBeNull();
    expect(expires.has('myKey')).toBeFalsy();
  });
  it('should delete key and expires', () => {
    let expires = new Expires();
    let store = new Store(expires);
    store.set('myKey', 'myValue');
    expires.set('myKey', Date.now() + 10000);
    store.delete('myKey');
    expect(store.get('myKey')).toBeNull();
    expect(expires.has('myKey')).toBeFalsy();
  });
  it('should remove expired key', () => {
    let expires = new Expires();
    let store = new Store(expires);
    store.set('myKey', 'myValue');
    expires.set('myKey', Date.now() - 1000);
    expect(store.has('myKey')).toBeFalsy();
    expect(expires.has('myKey')).toBeFalsy();
    store.set('myKey', 'myValue');
    expires.set('myKey', Date.now() - 1000);
    expect(store.get('myKey')).toBeNull();
  });
});
