'use strict';

const glob = require('glob');
const reactDocs = require('react-docgen');
const fs = require('fs-extra');
const path = require('path');
const jsdoc2md = require('jsdoc-to-markdown');
const formatReactComponentDoc = require('../lib/formatReactComponentDoc');

const files = glob.sync('src/**/*.js', {
  ignore: ['**/index.js', '**/*.stories.js', '**/*.test.js'],
});

function parse(src, name) {
  try {
    const info = reactDocs.parse(src);
    return formatReactComponentDoc(info, name);
  } catch (_) {
    // Try to parse regular JavaScript file.
    return jsdoc2md.renderSync({
      source: src,
      // Disable caching to avoid missmatch documentation.
      'no-cache': true,
      // The first heading will be `# myFunction`.
      'heading-depth': 1,
      // Use our custom partials
      partial: glob.sync(
        path.resolve(__dirname, '..', 'resources', 'partials', '**/*.hbs')
      ),
    });
  }
}

files.forEach(file => {
  const name = path.basename(file, '.js');
  const src = fs.readFileSync(file, 'utf8');
  const content = parse(src, name);

  if (content) {
    const outputFile = path.join('docs', `${name}.md`);
    fs.outputFileSync(outputFile, content);

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
