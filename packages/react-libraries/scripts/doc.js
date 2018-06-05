'use strict';

const glob = require('glob');
const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');

const files = glob.sync('src/**/*.js');

function code(value) {
  return `\`${value}\``;
}

function formatProp(propName, info) {
  const props = [
    code(propName),
    code(info.type.name),
    info.defaultValue ? code(info.defaultValue.value) : '',
    // Line breaks are not allowed in tables.
    info.description ? info.description.replace(/\n+/g, ' ') : '',
  ].join(' | ');

  return `| ${props} |`;
}

function formatProps(props) {
  return (
    '## Props\n\n' +
    '| Name | Type | Default value | Description |\n' +
    '| -- | -- | -- | -- |\n' +
    Object.keys(props)
      .sort()
      .map(propName => formatProp(propName, props[propName]))
      .join('\n') +
    '\n'
  );
}

function safeParse(src) {
  try {
    return reactDocs.parse(src);
  } catch (_) {
    return null;
  }
}

files.forEach(file => {
  const src = fs.readFileSync(file, 'utf8');
  const info = safeParse(src);

  if (info) {
    const md = [
      `# ${info.displayName}`,
      info.description,
      formatProps(info.props),
    ]
      .filter(Boolean)
      .join('\n\n');

    const outputFile = path.join('docs', `${info.displayName}.md`);
    fs.writeFileSync(outputFile, md);

    console.log(`${file} -> ${outputFile}`);
  }
});
