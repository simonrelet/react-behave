'use strict'

const jest = require('jest')
const createJestConfig = require('../config/createJestConfig')

function test(args) {
  // Watch unless on CI, in coverage mode, or explicitly running all tests
  if (!process.env.CI && args.indexOf('--coverage') === -1) {
    args.push('--watch')
  }

  args.push('--config', JSON.stringify(createJestConfig()))

  jest.run(args)
}

module.exports = test
