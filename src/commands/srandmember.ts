import { random } from 'lodash';

export function srandmember(key: string, count = 1) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Set)) {
    throw new Error(`Key ${key} does not contain a set`);
  }

  const value = this.data.get(key) || new Set();
  const list = Array.from(value);
  const total = list.length;

  if (total === 0) {
    return null;
  }

  const max = Math.abs(count);
  const skipDuplicates = count > -1;

  if (total <= max && skipDuplicates) {
    return list;
  }

  const items = [];
  let results = 0;
  while (results < max) {
    const item = list[random(0, total - 1)];
    results += 1;
    items.push(item);
  }

  return (max > 1) ? items : items[0];
}
