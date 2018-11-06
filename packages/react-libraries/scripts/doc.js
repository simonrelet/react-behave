'use strict'

const glob = require('glob')
const reactDocs = require('react-docgen')
const fs = require('fs-extra')
const path = require('path')
const jsdoc = require('jsdoc-api')
const formatReactComponentDoc = require('../lib/formatReactComponentDoc')
const formatJSDoc = require('../lib/formatJSDoc')
const generateReadme = require('../lib/generateReadme')
const logger = require('../lib/logger')
const headers = require('../lib/headers')
const canGenerateFile = require('../lib/canGenerateFile')

const outputFolder = 'docs'
const files = glob.sync('src/**/*.js', {
  ignore: [
    '**/*.{spec,test,stories}.js',
    '**/__tests__/**',
    '**/__mocks__/**',
    '**/setupTests.js',
  ],
})

function safeFormat(file, cb) {
  try {
    return cb()
  } catch (e) {
    console.error(`${file}: Could not create documentation:`, e)
    return null
  }
}

function parse(src, file) {
  try {
    const info = reactDocs.parse(src)
    return safeFormat(file, () => formatReactComponentDoc(info))
  } catch (_) {
    // Try to parse regular JavaScript file.
    const info = jsdoc.explainSync({ source: src })
    return safeFormat(file, () => formatJSDoc(info))
  }
}

function doc(args) {
  const readmeInput =
    args[0] === '--readme' || args[0] === '-r' ? args[1] : undefined

  files.forEach(file => {
    const src = fs.readFileSync(file, 'utf8')
    const content = parse(src, file)

    if (content) {
      const name = path.basename(file, '.js')
      const outputFile = path.join(outputFolder, `${name}.md`)

      if (canGenerateFile(outputFile)) {
        const header = headers.generateHeader(file)
        fs.outputFileSync(outputFile, `${header}${content}\n`)
        logger.generated(file, outputFile)
      }
    }
  })

  generateReadme(readmeInput)
}

module.exports = doc
