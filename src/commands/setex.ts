export function setex(key: string, seconds: number, value: any) {
  this.set(key, value);

  this.expire(key, seconds);

  return 'OK';
}
