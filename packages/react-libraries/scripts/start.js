'use strict';

process.env.NODE_ENV = 'development';
require('../config/env');

const rollup = require('rollup');
const config = require('./rollupConfig');

process.on('unhandledRejection', err => {
  throw err;
});

const watchOptions = Object.assign(
  { output: [config.outputOptionsCJS, config.outputOptionsES] },
  config.inputOptions
);

const message =
  `${config.inputOptions.input} -> ` +
  [config.outputOptionsCJS.file, config.outputOptionsES.file].join(', ');

function start() {
  const watcher = rollup.watch(watchOptions);

  watcher.on('event', event => {
    switch (event.code) {
      case 'BUNDLE_END':
        console.log(message);
        break;

      case 'ERROR':
      case 'FATAL':
        console.log('error:', event);
        break;

      default:
        break;
    }
  });
}

start();
