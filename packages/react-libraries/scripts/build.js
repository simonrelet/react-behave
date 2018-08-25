'use strict'

const buildJS = require('../lib/buildJS')
const buildSass = require('../lib/buildSass')

function build(args) {
  const watch = args[0] === '--watch' || args[0] === '-w'

  if (watch) {
    buildJS.start()
    buildSass.start()
  } else {
    buildSass
      .build()
      .then(buildJS.build)
      .catch(() => process.exit(1))
  }
}

module.exports = build
