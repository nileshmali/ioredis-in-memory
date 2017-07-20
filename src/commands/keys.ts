import * as minimatch from 'minimatch';

export function keys(glob: string) {
  return this.data.keys().filter((key: string) => minimatch(key, glob));
}
