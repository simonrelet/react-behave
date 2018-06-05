'use strict';

const spawnCommand = require('./spawnCommand');

const outputDirs = {
  commonjs: 'build/cjs',
  module: 'build/es',
};

function spawnBabel(env, watch = false) {
  process.env.BABEL_ENV = env;

  spawnCommand('babel', [
    '--no-babelrc',
    '--presets=@simonrelet/babel-preset-react-libraries',
    '-d',
    outputDirs[env],
    '--copy-files',
    'src',
    '--source-maps',
    watch ? '--watch' : '',
  ]);
}

module.exports = spawnBabel;
