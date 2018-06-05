'use strict';

const spawnBabel = require('../lib/spawnBabel');

process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

require('../config/env');

spawnBabel('commonjs', true);
