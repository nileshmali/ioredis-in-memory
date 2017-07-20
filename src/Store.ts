import Expires from './Expires';

export default class Store extends Map<string, any>{
  private expires: Expires;

  constructor(expires: Expires, initial: any = {}) {
    super();
    this.expires = expires;
    Object.keys(initial).forEach((key: string) => this.set(key, initial[key]))
  }

  delete(key: string): boolean {
    if (this.expires.has(key)) {
      this.delete(key);
    }
    return super.delete(key);
  }
  get(key: string): any {
    if (this.expires.has(key) && this.expires.isExpired(key)) {
      this.delete(key);
    }
    const value = super.get(key);

    if (Array.isArray(value)) {
      return value.slice();
    }

    if (Buffer.isBuffer(value)) {
      return Buffer.from(value);
    }

    if (value instanceof Set) {
      return new Set(value);
    }

    if (typeof value === 'object' && value) {
      return Object.assign({}, value);
    }

    return value;
  }
  has(key: string): boolean {
    if (this.expires.has(key) && this.expires.isExpired(key)) {
      this.delete(key);
    }
    return super.has(key);
  }

  set(key: string, value: any): this {
    let item = value;

    if (Array.isArray(value)) {
      item = value.slice();
    } else if (Buffer.isBuffer(value)) {
      item = Buffer.from(value);
    } else if (value instanceof Set) {
      item = new Set(value);
    } else if (typeof value === 'object' && value) {
      item = Object.assign({}, value);
    }

    return super.set(key, value);
  }
}