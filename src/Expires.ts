export default class Expires extends Map<string, number>{
  isExpired(key: string): boolean {
    return super.get(key) <= Date.now();
  }
}