'use strict';

const sortBy = require('lodash.sortby');
const flow = require('lodash.flow');
const formatCode = require('./formatCode');

const types = {
  any: 'Any',
  array: 'Array',
  arrayOf: 'Array',
  bool: 'Boolean',
  enum: 'Enum',
  func: 'Function',
  node: 'Node',
  number: 'Number',
  object: 'Object',
  string: 'String',
};

function formatType(type) {
  if (type.value) {
    switch (type.name) {
      case 'arrayOf':
        return `${formatCode(types[type.name])}<${formatType(type.value)}>`;

      case 'union':
        return type.value.map(formatType).join('|');

      case 'enum':
        if (type.computed) {
          return formatCode(types[type.name]);
        }
        return type.value.map(v => formatCode(v.value)).join('|');

      default:
        break;
    }
  }

  return formatCode(types[type.name]);
}

function toPropsArray(props) {
  return Object.keys(props).map(name => Object.assign({ name }, props[name]));
}

function prune(props) {
  return props.filter(
    prop => !prop.description || !prop.description.includes('@ignore')
  );
}

function sort(props) {
  return sortBy(props, [p => !p.required, 'name']);
}

function prepareDefaultValue(props) {
  return props.map(prop => {
    let { defaultValue } = prop;

    if (defaultValue) {
      if (defaultValue.value.includes('\n')) {
        defaultValue = `\n\n${formatCode(defaultValue.value, 'jsx')}`;
      } else {
        defaultValue = ` ${formatCode(defaultValue.value)}`;
      }

      defaultValue = `_Default value_:${defaultValue}`;
    } else {
      defaultValue = '';
    }

    return Object.assign({}, prop, { defaultValue });
  });
}

function format(props) {
  return props.map(prop => {
    const type = formatType(prop.type);
    const name = `${formatCode(prop.name)}: ${type}`;
    const required = prop.required ? '' : ' (optional)';
    const defaultValue = prop.defaultValue ? `\n\n${prop.defaultValue}` : '';
    const description = prop.description ? `\n\n${prop.description}` : '';

    return `### ${name}${required}${defaultValue}${description}`;
  });
}

function formatProps(props) {
  return flow(
    toPropsArray,
    prune,
    sort,
    prepareDefaultValue,
    format
  )(props).join('\n\n');
}

function formatReactComponentDoc(info) {
  const doc = [`# ${info.displayName}`];

  if (info.description) {
    doc.push(info.description);
  }

  if (info.props) {
    doc.push('## Props', formatProps(info.props));
  }

  return doc.join('\n\n');
}

module.exports = formatReactComponentDoc;
