import { ping } from '../ping';

describe('Test ping command', () => {
  it('should return message', () => {
    const redis = new MockRedis();
    expect((<any>redis).ping('hi')).toBe('hi');
    expect((<any>redis).ping()).toBe('PONG');
  });
});

class MockRedis {
  constructor() {
    (<any>this)['ping'] = ping.bind(this);
  }
}
