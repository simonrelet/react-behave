'use strict';

process.env.NODE_ENV = 'production';
require('../config/env');

const chalk = require('chalk');
const rollup = require('rollup');
const config = require('../lib/rollupConfig');

const args = process.argv.slice(2);
const watch = args[0] === '--watch' || args[0] === '-w';

process.on('unhandledRejection', err => {
  throw err;
});

function writeBundle(inputOptions) {
  return bundle => {
    if (Array.isArray(inputOptions.output)) {
      return Promise.all(inputOptions.output.map(opt => bundle.write(opt)));
    }

    return bundle.write(inputOptions.output);
  };
}

function build(inputOptions) {
  return rollup.rollup(inputOptions).then(writeBundle(inputOptions));
}

function buildAll() {
  return Promise.all(config.map(build));
}

function logSuccess() {
  console.log(chalk.green('Build successful.'));
}

function start() {
  const watcher = rollup.watch(config);

  watcher.on('event', event => {
    switch (event.code) {
      case 'END':
        logSuccess();
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

if (watch) {
  start();
} else {
  buildAll().then(logSuccess);
}
