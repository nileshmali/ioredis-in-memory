import RedisInMemory from '../RedisInMemory';
jest.mock('../commands');

describe('Test RedisInMemory', () => {
  it('should return result with callback', (done) => {
    const redis = new RedisInMemory();
    (<any>redis).ping('test message', (err: Error, result: string) => {
      expect(err).toBeNull();
      expect(result).toBe('test message');
      done();
    });
  });
  it('should return result with Promise', () => {
    const redis = new RedisInMemory();
    return (<any>redis).ping('test message').then((result: string) => {
      expect(result).toBe('test message');
    });
  });
  it('should support transaction with multi', () => {
    const redis = new RedisInMemory();
    let multi = redis.multi([['ping', 'first'], ['ping', 'second']]);
    return multi.exec().then(([first, second]) => {
      expect(first[1]).toBe('first');
      expect(second[1]).toBe('second');
    });
  });
});
