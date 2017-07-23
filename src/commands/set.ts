export function set(key: string, value: any, ...options: Array<string>) {
  const nx = options.indexOf('NX') !== -1;
  const xx = options.indexOf('XX') !== -1;
  const filteredOptions = options.filter(option => option !== 'NX' && option !== 'XX');

  if (nx && xx) throw new Error('ERR syntax error.');
  if (nx && this.data.has(key)) return null;
  if (xx && !this.data.has(key)) return null;

  this.data.set(key, value);

  const expireOptions = new Map(createKVArray(filteredOptions));
  const ttlSeconds = expireOptions.get('EX') || expireOptions.get('PX') / 1000.0;

  if (ttlSeconds) {
    this.expire(key, ttlSeconds);
  } else {
    this.expires.delete(key);
  }

  return 'OK';
}

function createKVArray(arr: Array<any>) {
  const groups: Array<[string, any]> = [];
  for (let i = 0; i < arr.length; i += 2) {
    groups.push(<[string, any]>[...arr.slice(i, i + 2)]);
  }
  return groups;
}
