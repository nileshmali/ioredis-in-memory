import { echo } from '../echo';

describe('Test echo command', () => {
  it('should return message', () => {
    const redis = new MockRedis();
    expect((<any>redis).echo('hi')).toBe('hi');
  });
});

class MockRedis {
  constructor() {
    (<any>this)['echo'] = echo.bind(this);
  }
}
