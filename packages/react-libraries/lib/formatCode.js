'use strict'

function formatCode(value, lang) {
  if (lang) {
    return `\`\`\`${lang}\n${value}\n\`\`\``
  }

  return `\`${value}\``
}

module.exports = formatCode
