import { lastsave } from '../lastsave';

describe('Test lastsave command', () => {
  it('should return lastsave timestamp', () => {
    const redis = new MockRedis();
    expect((<any>redis).lastsave()).toBeGreaterThanOrEqual(Math.floor(Date.now() / 1000));
  });
});

class MockRedis {
  constructor() {
    (<any>this)['lastsave'] = lastsave.bind(this);
  }
}
