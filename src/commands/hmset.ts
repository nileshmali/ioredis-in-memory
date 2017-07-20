export function hmset(key: string, ...args: Array<any>) {
  const hash = this.data.get(key) || {};

  for (let i = 0; i < args.length; i += 2) {
    hash[args[i]] = args[i + 1];
  }

  this.data.set(key, hash);

  return 'OK';
}
