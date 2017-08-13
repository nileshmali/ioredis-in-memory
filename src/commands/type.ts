export function type(key: string) {
  if (!this.data.has(key)) {
    return 'none';
  }

  const value = this.data.get(key);

  if (value instanceof Set) {
    return 'set';
  }

  if (Array.isArray(value)) {
    return 'list';
  }

  if (typeof value === 'string') {
    return 'string';
  }

  if (typeof value === 'object') {
    return 'hash';
  }
  return 'none';
}
