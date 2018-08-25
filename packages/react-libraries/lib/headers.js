'use strict'

const header = 'THIS FILE WAS GENERATED'

function generateHeader(src) {
  return `<!--
  ${header}!
  Don't make any changes in it, update ${src} instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->\n\n`
}

function hasHeader(content) {
  return new RegExp(`<!--\\s+${header}`, 'g').test(content)
}

module.exports = { generateHeader, hasHeader }
