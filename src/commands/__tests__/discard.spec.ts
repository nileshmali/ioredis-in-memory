import { discard } from '../discard';

describe('Test discard command', () => {
  it('should discard batch', () => {
    const redis = new MockRedis();
    redis.setBatch(['one', 'two']);
    expect((<any>redis).discard()).toBe('OK');
    expect(redis.getBatch()).toEqual([]);
  });
});

class MockRedis {
  private batch: any[];

  constructor() {
    (<any>this)['discard'] = discard.bind(this);
  }

  setBatch(batch: any[]) {
    this.batch = batch;
  }
  getBatch() {
    return this.batch;
  }
}
