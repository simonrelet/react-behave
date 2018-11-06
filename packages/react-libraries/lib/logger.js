'use strict'

function output(fn) {
  return (...args) => {
    console[fn](args.join('\n'))
  }
}

module.exports = {
  generated(src, dst) {
    console.log(`${src} -> ${dst}`)
  },

  error: output('error'),
  log: output('log'),
}
