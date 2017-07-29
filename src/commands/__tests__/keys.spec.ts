import Store from '../../Store';
import Expires from '../../Expires';
import { keys } from '../keys';

describe('Test keys command', () => {
  it('should return matching keys', () => {
    const redis = new MockRedis();
    expect((<any>redis).keys('*o*')).toHaveLength(3);
    expect((<any>redis).keys('t??')).toHaveLength(1);
    expect((<any>redis).keys('*')).toHaveLength(4);
  });
});

class MockRedis {
  private data: Store;
  constructor() {
    this.data = new Store(new Expires(), {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
    });
    (<any>this)['keys'] = keys.bind(this);
  }
}
