'use strict';

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const fs = require('fs-extra');
const replace = require('rollup-plugin-replace');
const { sizeSnapshot } = require('rollup-plugin-size-snapshot');
const { uglify } = require('rollup-plugin-uglify');
const changeCase = require('change-case');
const readEnv = require('../lib/readEnv');

const pkg = fs.readJSONSync('package.json');

const peerDependencies = Object.keys(pkg.peerDependencies || {});
const allDependencies = peerDependencies.concat(
  Object.keys(pkg.dependencies || {})
);

const input = 'src/index.js';
const cjsOutput = pkg.main;
const esOutput = pkg.module;
const umdDevOutput = pkg['unpkg-dev'];
const umdProdOutput = pkg.unpkg;
// Remove namespace from the exported name
const exportedName = changeCase.pascalCase(pkg.name.replace(/^@.*\//, ''));

// For an array of module names, return an array of import matcher function.
//
// Ex: `['my-module']` matches:
// - `import 'my-module'`
// - `import 'my-module/inner-path'`
function createModulesMatcher(modulesNames) {
  const patterns = modulesNames.map(name => new RegExp(`^${name}(\\/.+)*$`));
  return id => patterns.some(pattern => pattern.test(id));
}

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

function getEnvReplacement(isProd) {
  const replacements = Object.assign(readEnv(), {
    'process.env.NODE_ENV': JSON.stringify(
      isProd ? 'production' : 'development'
    ),
  });

  return replacements;
}

function createMainOptions(format, file) {
  return {
    input,
    output: {
      file,
      format,
      sourcemap: true,
    },
    external: createModulesMatcher(allDependencies),
    plugins: [
      nodeResolve(),
      commonjs({ include: /node_modules/ }),
      babel({
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', { modules: false }],
          ['@babel/preset-stage-1', { decoratorsLegacy: true }],
          '@babel/preset-react',
        ],
      }),
      replace(getEnvReplacement(true)),
      sizeSnapshot(),
    ],
  };
}

function createUMDOptions(isProd, file) {
  const plugins = [
    nodeResolve(),
    commonjs({ include: /node_modules/ }),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }],
        ['@babel/preset-stage-1', { decoratorsLegacy: true }],
        '@babel/preset-react',
      ],
    }),
    replace(getEnvReplacement(isProd)),
    sizeSnapshot(),
  ];

  if (isProd) {
    plugins.push(uglify());
  }

  return {
    input,
    output: {
      name: exportedName,
      file,
      format: 'umd',
      globals,
    },
    external: createModulesMatcher(peerDependencies),
    plugins,
  };
}

module.exports = [
  umdProdOutput ? createUMDOptions(true, umdProdOutput) : null,
  umdDevOutput ? createUMDOptions(false, umdDevOutput) : null,
  cjsOutput ? createMainOptions('cjs', cjsOutput) : null,
  esOutput ? createMainOptions('es', esOutput) : null,
].filter(Boolean);
