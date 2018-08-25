'use strict'

const chalk = require('chalk')
const sass = require('node-sass')
const fs = require('fs-extra')
const postcss = require('postcss')
const chokidar = require('chokidar')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const snapshotCSSSize = require('./snapshotCSSSize')

const pkg = fs.readJSONSync('package.json')
const outputFile = pkg.style

const config = {
  file: './src/index.scss',
  includePaths: ['node_modules'],
}

function logSuccess() {
  console.log(chalk.green('SASS build successful.'))
}

function buildCSS(css) {
  return postcss([autoprefixer, cssnano])
    .process(css, { from: undefined })
    .then(result => result.css)
}

function formatError(error) {
  return `\n${error.file}:${error.line}:${error.column}\n  ${error.message}`
}

function buildSCSS() {
  return new Promise((resolve, reject) => {
    sass.render(config, (error, result) => {
      if (error) {
        console.error(formatError(error))
        return reject()
      }

      resolve(result.css.toString())
    })
  })
}

function build() {
  return buildSCSS()
    .then(buildCSS)
    .then(snapshotCSSSize(outputFile))
    .then(css => fs.outputFile(outputFile, css))
    .then(logSuccess)
    .catch(e => {
      if (e) {
        console.error(e)
        return Promise.reject()
      }
    })
}

function start() {
  const watcher = chokidar.watch('src/**/*.scss', { ignoreInitial: true })
  watcher.on('all', () => build().catch(() => {}))
  build()
}

module.exports = outputFile
  ? {
      build,
      start,
    }
  : {
      build: () => Promise.resolve(),
      start: () => {},
    }
