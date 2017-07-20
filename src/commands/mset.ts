export function mset(...args: Array<any>) {
  for (let i = 0; i < args.length; i += 2) {
    this.set(args[i], args[i + 1]);
  }

  return 'OK';
}
