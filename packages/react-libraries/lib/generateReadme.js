'use strict';

const fs = require('fs-extra');
const get = require('lodash.get');
const logger = require('./logger');
const generateHeader = require('./generateHeader');

const src = 'README-template.md';
const dst = 'README.md';
const header = generateHeader(src);

function generateReadme() {
  if (fs.existsSync(src)) {
    const pkg = fs.readJSONSync('package.json');

    const readme = fs
      .readFileSync(src, 'utf8')
      .replace(/(.)\$\{([^}]+)\}/g, (match, escapeChar, path) => {
        if (escapeChar === '$') {
          return match.substring(1);
        }

        const value = get(pkg, path, null);
        return `${escapeChar}${value}` || match;
      });

    // // Replace all unescaped variables.
    // .replace(/([^\\])\$\{VERSION\}/g, `$1${pkg.version}`)
    // .replace(/([^\\])\$\{DESCRIPTION\}/g, `$1${pkg.description}`)
    // .replace(/([^\\])\$\{NAME\}/g, `$1${pkg.name}`)
    // // Remove all `\` from escaped variables (ex: `\${VERSION}` => `${VERSION}` )
    // .replace(/\\(\$\{(VERSION|DESCRIPTION|NAME)\})/g, '$1');

    fs.writeFileSync(dst, `${header}${readme}`);
    logger.generated(src, dst);
  }
}

module.exports = generateReadme;
