export function decrby(key: string, decrement: string = '0') {
  const curVal = Number(this.data.get(key));
  const nextVal = curVal - parseInt(decrement, 10);
  this.data.set(key, nextVal.toString());
  return nextVal;
}
