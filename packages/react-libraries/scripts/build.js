'use strict';

process.env.NODE_ENV = 'production';
require('../config/env');

const rollup = require('rollup');
const config = require('../lib/rollupConfig');

process.on('unhandledRejection', err => {
  throw err;
});

const message =
  `${config.inputOptions.input} -> ` +
  config.outputOptions.map(opt => opt.file).join(', ');

function build() {
  rollup
    .rollup(config.inputOptions)
    .then(bundle =>
      Promise.all(config.outputOptions.map(opt => bundle.write(opt)))
    )
    .then(() => console.log(message));
}

build();
