'use strict'

const chalk = require('chalk')
const rollup = require('rollup')
const config = require('../config/rollupConfig')

function writeBundle(inputOptions) {
  return bundle => {
    if (Array.isArray(inputOptions.output)) {
      return Promise.all(inputOptions.output.map(opt => bundle.write(opt)))
    }

    return bundle.write(inputOptions.output)
  }
}

function buildConfig(inputOptions) {
  return rollup.rollup(inputOptions).then(writeBundle(inputOptions))
}

function logSuccess() {
  console.log(chalk.green('JavaScript build successful.'))
}

function formatError(error) {
  return `\n${error.message}`
}

function build() {
  return Promise.all(config.map(buildConfig))
    .then(logSuccess)
    .catch(e => {
      console.error(formatError(e))
      Promise.reject()
    })
}

function start() {
  const watcher = rollup.watch(config)

  watcher.on('event', event => {
    switch (event.code) {
      case 'END':
        logSuccess()
        break

      case 'ERROR':
      case 'FATAL':
        console.error(formatError(event.error))
        break

      default:
        break
    }
  })
}

module.exports = {
  build,
  start,
}
