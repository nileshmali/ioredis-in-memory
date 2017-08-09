import { random } from 'lodash';
export function randomkey() {
  const keys: string[] = [];
  this.data.forEach((v: any, k: string) => {
    keys.push(k);
  });
  return keys.length > 0 ? keys[random(0, keys.length - 1)] : null;
}
