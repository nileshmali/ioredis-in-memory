import { random } from 'lodash';

export function spop(key: string, count = 1) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Set)) {
    throw new Error(`Key ${key} does not contain a set`);
  }

  const set = this.data.get(key) || new Set();
  const list = Array.from(set);
  const total = set.size;

  if (total === 0) {
    return null;
  }

  if (total <= count) {
    this.data.set(key, new Set());
    return list;
  }

  const items = [];
  let results = 0;
  while (results < count) {
    const item = list.splice(random(0, list.length - 1), 1);

    results += 1;
    items.push(...item);
  }
  this.data.set(key, new Set(list));

  return (count > 1) ? items : items[0];
}
