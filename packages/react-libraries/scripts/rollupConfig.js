'use strict';

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const external = require('rollup-plugin-peer-deps-external');
const path = require('path');
const fs = require('fs-extra');
const postcss = require('rollup-plugin-postcss');
const replace = require('rollup-plugin-replace');
const url = require('rollup-plugin-url');

const pkg = fs.readJSONSync(path.resolve('package.json'));

const inputOptions = {
  input: 'src/index.js',
  external: Object.keys(pkg.dependencies),
  plugins: [
    external(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    postcss({ modules: true }),
    url(),
    babel({
      exclude: 'node_modules/**',
      presets: [['env', { modules: false }], 'stage-0', 'react'],
      plugins: ['external-helpers'],
    }),
    resolve(),
    commonjs(),
  ],
};

const outputOptionsCJS = {
  file: pkg.main,
  format: 'cjs',
  sourcemap: true,
};

const outputOptionsES = {
  file: pkg.module,
  format: 'es',
  sourcemap: true,
};

module.exports = {
  inputOptions,
  outputOptionsCJS,
  outputOptionsES,
};
