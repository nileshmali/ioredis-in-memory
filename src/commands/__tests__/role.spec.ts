import { role } from '../role';

describe('Test role command', () => {
  it('should return role', () => {
    const redis = new MockRedis();
    expect((<any>redis).role()).toEqual(['master', 0]);
  });
});

class MockRedis {
  constructor() {
    (<any>this)['role'] = role.bind(this);
  }
}
