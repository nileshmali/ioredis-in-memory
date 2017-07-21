import { EventEmitter } from 'events';
import * as Promise from 'bluebird';
import Store from './Store';
import Expires from './Expires';
import * as commands from './commands';

class RedisInMemory extends EventEmitter {
  private data: Object;
  private batch: Array<any>;
  private expires: Expires;
  constructor({ data = {} } = {}) {
    super();
    this.expires = new Expires();
    this.data = new Store(this.expires, data);
    this.batch = [];

    Object.keys(commands).forEach((command) => {
      (<any>this)[command] = decorateCommand((<any>commands)[command].bind(this));
    });

    process.nextTick(() => {
      this.emit('connect');
      this.emit('ready');
    });
  }
  multi(batch: Array<Array<string>>): this {
    if (batch && batch.length > 0) {
      this.batch = batch.map(([command, ...options]) => (<any>this)[command].bind(this, ...options));
    }
    return this;
  }
  exec(cb: Function): Promise<Array<any>> {
    return Promise.all(this.batch.map(promise => promise()))
      .then(results => results.map(result => [null, result]))
      .nodeify(cb);
  }
}

function decorateCommand(emulate: any) {
  return (...args: any[]) => {
    let callback: Function = undefined;
    let argLen = args.length;
    if (typeof args[args.length - 1] === 'function') {
      callback = args[args.length - 1];
      argLen -= 1;
    }

    const newArgs: Array<string | Buffer> = [];
    for (let i = 0; i < argLen; i += 1) {
      newArgs.push(...prepareArg(args[i]));
    }
    return new Promise(resolve => resolve(emulate(...newArgs))).asCallback(callback);
  };
}

function prepareArg(arg: any) {
  if (arg instanceof Buffer) {
    return [arg];
  }
  if (typeof arg === 'object') {
    const newArgs: string[] = [];
    Object.keys(arg).forEach((key: string) => {
      newArgs.push(key, arg[key]);
    });
    return newArgs;
  }
  return [arg.toString()];
}
module.exports = RedisInMemory;
