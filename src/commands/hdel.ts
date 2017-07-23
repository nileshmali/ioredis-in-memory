export function hdel(key: string, ...fields: string[]) {
  if (!key || !fields || fields.length === 0) {
    throw new Error(`Wrong number of arguments.`);
  }
  const value = this.data.get(key) || {};
  const numDeleted = fields.filter((field) => {
    if ({}.hasOwnProperty.call(value, field)) {
      delete value[field];
      return true;
    }
    return false;
  }).length;
  this.data.set(key, value);
  return numDeleted;
}
