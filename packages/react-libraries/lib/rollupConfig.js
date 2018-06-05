'use strict';

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const path = require('path');
const fs = require('fs-extra');
const replace = require('rollup-plugin-replace');
const { sizeSnapshot } = require('rollup-plugin-size-snapshot');
const { uglify } = require('rollup-plugin-uglify');
const changeCase = require('change-case');

const pkg = fs.readJSONSync(path.resolve('package.json'));

const peerDependencies = Object.keys(pkg.peerDependencies || {});
const allDependencies = peerDependencies.concat(
  Object.keys(pkg.dependencies || {})
);

const input = 'src/index.js';

// Remove namespace
const name = pkg.name.replace(/^@.*\//, '');
const exportedName = changeCase.pascalCase(name);

// For an array of module names, return an array of import matcher function.
//
// Ex: `['my-module']` matches:
// - `import myModule from 'my-module'`
// - `import myModule from 'my-module/inner-path'`
function createModulesMatcher(modulesNames) {
  const patterns = modulesNames.map(name => new RegExp(`^${name}(\\/.+)*$`));
  return id => patterns.some(pattern => pattern.test(id));
}

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

function createMainOptions(format) {
  const fileName = `${name}${format === 'es' ? '.es' : ''}.js`;

  return {
    input,
    output: {
      file: path.join('build', fileName),
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
          '@babel/preset-stage-1',
          '@babel/preset-react',
        ],
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
    ],
  };
}

function createUMDOptions(isProd) {
  const fileName = `${name}.${isProd ? 'production.min' : 'development'}.js`;

  const plugins = [
    nodeResolve(),
    commonjs({ include: /node_modules/ }),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-stage-1',
        '@babel/preset-react',
      ],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        isProd ? 'production' : 'development'
      ),
    }),
    sizeSnapshot(),
  ];

  if (isProd) {
    plugins.push(uglify());
  }

  return {
    input,
    output: {
      name: exportedName,
      file: path.join('build', 'umd', fileName),
      format: 'umd',
      globals,
    },
    external: createModulesMatcher(peerDependencies),
    plugins,
  };
}

const umdProduction = createUMDOptions(true);
const umdDevelopment = createUMDOptions(false);
const mainCJS = createMainOptions('cjs');
const mainES = createMainOptions('es');

module.exports = [umdProduction, umdDevelopment, mainCJS, mainES];
