'use strict';

const header = 'THIS FILE WAS GENERATED';

function generateHeader(src) {
  return `<!--
  ${header}!
  Don't make any changes in it, update ${src} instead.
-->\n\n`;
}

function hasHeader(content) {
  return new RegExp(header, 'gi').test(content);
}

module.exports = { generateHeader, hasHeader };
