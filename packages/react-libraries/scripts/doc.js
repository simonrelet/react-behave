'use strict';

const glob = require('glob');
const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');

const files = glob.sync('src/**/*.js');

function code(value) {
  return `\`${value}\``;
}

function formatName(propName, info) {
  return info.required
    ? `<strong><code>${propName}</code>*</strong>`
    : code(propName);
}

function formatType(type) {
  if (type.value) {
    switch (type.name) {
      case 'arrayOf':
        return `${code(type.name)}<${formatType(type.value)}>`;

      case 'union':
        return type.value.map(formatType).join('\\|');

      default:
        break;
    }
  }

  return code(type.name);
}

function formatProp(propName, info) {
  const props = [
    formatName(propName, info),
    formatType(info.type),
    info.defaultValue ? code(info.defaultValue.value) : '',
    // Line breaks are not allowed in tables.
    info.description ? info.description.replace(/\n+/g, ' ') : '',
  ].join(' | ');

  return `| ${props} |`;
}

function formatProps(props) {
  const formattedProps = Object.keys(props)
    .sort()
    .map(propName => formatProp(propName, props[propName]));

  return [
    '## Props\n',
    '_Mandatory props are marked with a `*`._\n',
    '| Name | Type | Default value | Description |',
    '| ---- | :--: | :-----------: | ----------- |',
    ...formattedProps,
  ].join('\n');
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
