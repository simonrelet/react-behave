'use strict';

function generateHeader(src) {
  return `<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update ${src} instead.
-->\n\n`;
}

module.exports = generateHeader;
