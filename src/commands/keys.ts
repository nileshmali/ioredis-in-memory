import * as minimatch from 'minimatch';

export function keys(glob: string) {
  const keys: any[] = [];
  this.data.forEach((value: any, key: string) => {
    if (minimatch(key, glob)) {
      keys.push(key);
    }
  });
  return keys;
}
