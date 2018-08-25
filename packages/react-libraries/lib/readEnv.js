'use strict'

const pattern = /^REACT_LIB_/

function readEnv() {
  return Object.keys(process.env)
    .filter(name => pattern.test(name))
    .map(name => ({
      [`process.env.${name}`]: JSON.stringify(process.env[name]),
    }))
    .reduce((acc, o) => Object.assign(acc, o), {})
}

module.exports = readEnv
