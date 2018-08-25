'use strict'

const fs = require('fs-extra')
const headers = require('./headers')

function canGenerateFile(file) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8')
    if (!headers.hasHeader(content)) {
      console.log(`Skiping manually written file: ${file}.`)
      return false
    }
  }

  return true
}

module.exports = canGenerateFile
