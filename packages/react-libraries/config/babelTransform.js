'use strict'

const babelJest = require('babel-jest')
const createBabelConfig = require('./createBabelConfig')

module.exports = babelJest.createTransformer(
  createBabelConfig({ modules: 'commonjs' })
)
