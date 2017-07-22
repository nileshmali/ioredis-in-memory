import Expires from '../Expires';

describe('Expires Test', () => {
  it('should return isExpired as true', () => {
    let expires = new Expires();
    expires.set('expired', (Date.now() - 100));
    expect(expires.isExpired('expired')).toBeTruthy();
  });

  it('should return isExpired as false', () => {
    let expires = new Expires();
    expires.set('expired', (Date.now() + 10000));
    expect(expires.isExpired('expired')).toBeFalsy();
  });
});
