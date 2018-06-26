'use strict';

const glob = require('glob');
const reactDocs = require('react-docgen');
const fs = require('fs-extra');
const path = require('path');
const jsdoc = require('jsdoc-api');
const formatReactComponentDoc = require('../lib/formatReactComponentDoc');
const formatJSDoc = require('../lib/formatJSDoc');

const files = glob.sync('src/**/*.js', {
  ignore: ['**/index.js', '**/*.stories.js', '**/*.test.js'],
});

function parse(src, file, name) {
  try {
    const info = reactDocs.parse(src);
    return formatReactComponentDoc(info);
  } catch (_) {
    // Try to parse regular JavaScript file.
    const info = jsdoc.explainSync({ source: src });
    return formatJSDoc(info);
  }
}

files.forEach(file => {
  const name = path.basename(file, '.js');
  const src = fs.readFileSync(file, 'utf8');
  const content = parse(src, file, name);

  if (content) {
    const outputFile = path.join('docs', `${name}.md`);
    fs.outputFileSync(outputFile, `${content}\n`);

    console.log(`${file} -> ${outputFile}`);
  }
});

const pkg = fs.readJSONSync(path.resolve('package.json'));
const readme = fs
  .readFileSync('README-template.md', 'utf8')
  .replace(/\$\{VERSION\}/g, pkg.version)
  .replace(/\$\{DESCRIPTION\}/g, pkg.description)
  .replace(/\$\{NAME\}/g, pkg.name);

fs.writeFileSync('README.md', readme);

console.log(`README-template.md -> README.md`);
