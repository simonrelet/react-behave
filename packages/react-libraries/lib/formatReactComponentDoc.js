'use strict';

function formatCode(value) {
  return `\`${value}\``;
}

function formatName(propName, info) {
  return info.required
    ? `<strong><code>${propName}</code>*</strong>`
    : formatCode(propName);
}

function formatType(type) {
  if (type.value) {
    switch (type.name) {
      case 'arrayOf':
        return `${formatCode(type.name)}<${formatType(type.value)}>`;

      case 'union':
        return type.value.map(formatType).join('\\|');

      default:
        break;
    }
  }

  return formatCode(type.name);
}

function formatProp(propName, info) {
  const props = [
    formatName(propName, info),
    formatType(info.type),
    info.defaultValue ? formatCode(info.defaultValue.value) : '',
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

function formatReactComponentDoc(info, name) {
  return [`# ${name}`, info.description, formatProps(info.props)]
    .filter(Boolean)
    .join('\n\n');
}

module.exports = formatReactComponentDoc;
