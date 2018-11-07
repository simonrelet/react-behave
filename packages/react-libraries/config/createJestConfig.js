'use strict'

const fs = require('fs-extra')
const path = require('path')

const testsSetupPath = 'src/setupTests.js'

function resolve(relativePath) {
  return path.resolve(__dirname, '..', relativePath)
}

function createJestConfig() {
  const setupTestsFile = fs.existsSync(testsSetupPath)
    ? `<rootDir>/${testsSetupPath}`
    : undefined

  const config = {
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/**/*.stories.js',
      '!src/**/index.js',
    ],
    setupFiles: [require.resolve('regenerator-runtime/runtime')],
    setupTestFrameworkScriptFile: setupTestsFile,
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
      '<rootDir>/src/**/?(*.)(spec|test).{js,jsx}',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx)$': resolve('config/babelTransform.js'),
      '^(?!.*\\.(js|jsx|json)$)': resolve('config/fileTransform.js'),
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
      '^.+\\.module\\.scss$',
    ],
    moduleNameMapper: {
      '^.+\\.module\\.scss$': require.resolve('identity-obj-proxy'),
    },
    moduleFileExtensions: ['js', 'json', 'jsx'],
  }

  return config
}

module.exports = createJestConfig
