# ioredis-in-memory

[![dependencies Status](https://david-dm.org/nileshmali/ioredis-in-memory/status.svg?style=flat-square)](https://david-dm.org/nileshmali/ioredis-in-memory)
[![devDependencies Status](https://david-dm.org/nileshmali/ioredis-in-memory/dev-status.svg?style=flat-square)](https://david-dm.org/nileshmali/ioredis-in-memory?type=dev)
[![Code Climate](https://img.shields.io/codeclimate/github/nileshmali/ioredis-in-memory.svg?style=flat-square)](https://codeclimate.com/github/nileshmali/ioredis-in-memory)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/nileshmali/ioredis-in-memory.svg?style=flat-square)](https://codeclimate.com/github/nileshmali/ioredis-in-memory/coverage)
[![Issue Count](https://img.shields.io/codeclimate/issues/github/nileshmali/ioredis-in-memory.svg?style=flat-square)](https://codeclimate.com/github/nileshmali/ioredis-in-memory)
[![npm](https://img.shields.io/npm/v/ioredis-in-memory.svg?style=flat-square)](https://www.npmjs.com/package/ioredis-in-memory)
[![npm](https://img.shields.io/npm/dt/ioredis-in-memory.svg?style=flat-square)](https://www.npmjs.com/package/ioredis-in-memory)
[![Travis](https://img.shields.io/travis/nileshmali/ioredis-in-memory.svg?style=flat-square)](https://travis-ci.org/nileshmali/ioredis-in-memory)

[![NPM](https://nodei.co/npm/ioredis-in-memory.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ioredis-in-memory/)
[![NPM](https://nodei.co/npm-dl/ioredis-in-memory.png?height=2)](https://nodei.co/npm/ioredis-in-memory/)

Yet another in-memory alternative for [ioredis](https://github.com/luin/ioredis). Goal of this lib is to provide full API compatibilty with [ioredis](https://github.com/luin/ioredis). Which can be used to write unit tests or while developing applications.

## Usage
```js
const RedisInMemory = require('ioredis-in-memory');
const redis = new RedisInMemory({
  data: {    
    key: 'value'
    .
    .
    .
  }
});
// Use it like ioredis
```

## Roadmap

- [x] Basic commands support
- [ ] Unit tests for all commands
- [ ] Publish compatibility table
- [ ] Pipeline support

## Credits

This is rewrite of [ioredis-mock](https://github.com/stipsan/ioredis-mock), hence borrows most of the code from it.

## License

Copyright (c) Nilesh Mali. All rights reserved.

Licensed under the [MIT](LICENSE) License.