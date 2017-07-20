export function psetex(key: string, milliseconds: number, value: any) {
  this.set(key, value);

  this.pexpire(key, milliseconds);

  return 'OK';
}
