import { time } from '../time';

describe('Test time command', () => {
  it('should return current server time', () => {
    const redis = new MockRedis();
    expect((<any>redis).time()).toBeInstanceOf(Array);
    expect((<any>redis).time()).toHaveLength(2);
  });
});

class MockRedis {
  constructor() {
    (<any>this)['time'] = time.bind(this);
  }
}
