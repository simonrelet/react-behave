'use strict'

const fs = require('fs-extra')
const get = require('lodash.get')
const logger = require('./logger')
const headers = require('./headers')
const canGenerateFile = require('./canGenerateFile')

const dst = 'README.md'

function generateReadme(src = 'README-template.md') {
  if (fs.existsSync(src) && canGenerateFile(dst)) {
    const header = headers.generateHeader(src)
    const pkg = fs.readJSONSync('package.json')

    const readme = fs
      .readFileSync(src, 'utf8')
      .replace(/(.{2})?\{\{([^}]+)\}\}/g, (match, escapeChar, path) => {
        if (escapeChar === '\\\\') {
          return match.substring(2)
        }

        const value = get(pkg, path, null)
        return value ? `${escapeChar || ''}${value}` : match
      })

    fs.writeFileSync(dst, `${header}${readme}`)
    logger.generated(src, dst)
  }
}

module.exports = generateReadme
