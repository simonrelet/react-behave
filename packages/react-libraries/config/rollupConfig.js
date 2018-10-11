'use strict'

const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const fs = require('fs-extra')
const replace = require('rollup-plugin-replace')
const { uglify } = require('rollup-plugin-uglify')
const postcss = require('rollup-plugin-postcss')
const reactSvg = require('@svgr/rollup').default
const changeCase = require('change-case')
const path = require('path')
const loaderUtils = require('loader-utils')
const readEnv = require('../lib/readEnv')
const merge = require('lodash.merge')
const createBabelConfig = require('./createBabelConfig')

const pkg = fs.readJSONSync('package.json')

const peerDependencies = Object.keys(pkg.peerDependencies || {})
const allDependencies = peerDependencies.concat(
  Object.keys(pkg.dependencies || {})
)

const input = 'src/index.js'
const cjsOutput = pkg.main
const esOutput = pkg.module
const umdDevOutput = pkg['unpkg-dev']
const umdProdOutput = pkg.unpkg
const config = merge({ external: [] }, pkg['react-libraries'])
// Remove namespace from the exported name
const exportedName = changeCase.pascalCase(pkg.name.replace(/^@.*\//, ''))

// For an array of module names, return an array of import matcher function.
//
// Ex: `['my-module']` matches:
// - `import 'my-module'`
// - `import 'my-module/inner-path'`
function createModulesMatcher(modulesNames) {
  let patterns = modulesNames.map(name => new RegExp(`^${name}(\\/.+)*$`))
  patterns = patterns.concat(
    config.external.map(pattern => new RegExp(pattern))
  )
  return id => patterns.some(pattern => pattern.test(id))
}

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

function getEnvReplacement(isProd) {
  const env = readEnv()

  if (isProd != null) {
    return Object.assign(env, {
      'process.env.NODE_ENV': JSON.stringify(
        isProd ? 'production' : 'development'
      ),
    })
  }

  return env
}

function generateScopedName(className, filePath) {
  // Only transform the class name for modules files.
  if (/\.module\.scss$/.test(filePath)) {
    // Remove the .module that appears in every class name when based on the file.
    const file = path.basename(filePath, '.module.scss')

    // Create a hash based on a the file location and class name.
    // Will be unique across a project, and close to globally unique.
    const hash = loaderUtils.getHashDigest(
      filePath + className,
      'md5',
      'base64',
      5
    )

    return `${file}_${className}__${hash}`
  }

  return className
}

function babelPreset() {
  return babel(
    Object.assign(
      { exclude: 'node_modules/**' },
      createBabelConfig({ modules: false })
    )
  )
}

function reactSvgPreset() {
  return reactSvg({
    ref: true,
    dimensions: false,
  })
}

function createMainOptions(format, file) {
  const replacements = getEnvReplacement()

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
      postcss({
        extract: true,
        modules: {
          generateScopedName,
          camelCase: true,
        },
      }),
      reactSvgPreset(),
      babelPreset(),
      Object.keys(replacements).length ? replace(replacements) : null,
    ].filter(Boolean),
  }
}

function createUMDOptions(isProd, file) {
  const plugins = [
    nodeResolve(),
    commonjs({ include: /node_modules/ }),
    postcss({
      extract: true,
      modules: {
        generateScopedName,
        camelCase: true,
      },
    }),
    reactSvgPreset(),
    babelPreset(),
    replace(getEnvReplacement(isProd)),
  ]

  if (isProd) {
    plugins.push(uglify())
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
  }
}

module.exports = [
  umdProdOutput ? createUMDOptions(true, umdProdOutput) : null,
  umdDevOutput ? createUMDOptions(false, umdDevOutput) : null,
  cjsOutput ? createMainOptions('cjs', cjsOutput) : null,
  esOutput ? createMainOptions('es', esOutput) : null,
].filter(Boolean)
