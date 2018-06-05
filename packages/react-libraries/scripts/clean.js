'use strict';

const spawnCommand = require('../lib/spawnCommand');

process.on('unhandledRejection', err => {
  throw err;
});

spawnCommand('rimraf', ['build', 'build-storybook']);
