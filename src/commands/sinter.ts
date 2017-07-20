export function sinter(...keys: Array<string>) {
  const values: Array<any> = this.sunion(keys);
  const sets = keys.map(key => (this.data.get(key) || new Set()));

  const intersection = values.filter(value => (
    sets.reduce((isShared, set) => (
      set.has(value) ? isShared : false
    ), /* isShared*/ true)
  ));

  return Array.from(new Set(intersection));
}
