import { publish } from '../publish';

describe('Test publish command', () => {
  it('should return 0', () => {
    const redis = new MockRedis();
    expect((<any>redis).publish()).toBe(0);
  });
});

class MockRedis {
  constructor() {
    (<any>this)['publish'] = publish.bind(this);
  }
}
