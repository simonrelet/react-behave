'use strict'

const flow = require('lodash.flow')
const formatCode = require('./formatCode')

function prune(docs) {
  return docs.filter(doc => !!doc.description)
}

function formatType(type) {
  return type.names.join('|')
}

function formatReturnType(returns) {
  return returns.length ? formatType(returns[0].type) : 'Void'
}

function formatTitleParamsListRec(params) {
  if (params.length === 0) {
    return ''
  }

  const param = params[0]
  const other = formatTitleParamsListRec(params.slice(1))

  if (param.optional) {
    return other ? `[${param.name}, ${other}]` : `[${param.name}]`
  }

  return other ? `${param.name}, ${other}` : param.name
}

function formatTitleParamsList(params) {
  return formatTitleParamsListRec(
    params.filter(param => !param.name.includes('.'))
  )
}

function formatSignature(doc) {
  const titleParams = formatTitleParamsList(doc.params)
  const returnType = formatReturnType(doc.returns)
  const signature = formatCode(
    `${doc.name}(${titleParams}): ${returnType}`,
    'js'
  )

  return `## Type signature\n\n${signature}`
}

function formatReturns(returns) {
  if (returns.length === 0) {
    return ''
  }

  returns = returns[0]
  const description = returns.description ? `: ${returns.description}` : ''
  return `**Return** ${formatCode(formatType(returns.type))}${description}`
}

function formatParams(params) {
  if (params.length === 0) {
    return ''
  }

  const formattedParams = params
    .map(param => {
      const description = param.description ? `: ${param.description}` : ''
      let name = param.name.replace(/^.*(\.)/, '$1')
      name = param.optional ? `[${name}]` : name
      const indent = '  '.repeat(param.name.split('.').length - 1)
      const signature = formatCode(`${name}: ${formatType(param.type)}`)
      return `${indent}- ${signature}${description}`
    })
    .join('\n')

  return `**Parameters**:\n\n${formattedParams}`
}

function prepareSignature(docs) {
  return docs.map(doc =>
    Object.assign({}, doc, { proto: formatSignature(doc) })
  )
}

function prepareReturns(docs) {
  return docs.map(doc =>
    Object.assign({}, doc, { returns: formatReturns(doc.returns) })
  )
}

function prepareParams(docs) {
  return docs.map(doc =>
    Object.assign({}, doc, { params: formatParams(doc.params) })
  )
}

function format(docs) {
  return docs.map(doc => {
    const title = `# ${doc.name}`
    const proto = `\n\n${doc.proto}`
    const description = doc.description ? `\n\n${doc.description}` : ''
    const returns = doc.returns ? `\n\n${doc.returns}` : ''
    const params = doc.params ? `\n\n${doc.params}` : ''

    return `${title}${description}${proto}${params}${returns}`
  })
}

function formatJSDoc(docs) {
  return flow(
    prune,
    prepareSignature,
    prepareReturns,
    prepareParams,
    format
  )(docs).join('\n\n')
}

module.exports = formatJSDoc
