#!/usr/bin/env node
'use strict'

process.on('unhandledRejection', err => {
  throw err
})

const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const pkg = require('../package')

const args = process.argv.slice(2)
const script = args[0]
const scripts = fs
  .readdirSync(path.join(__dirname, '..', 'scripts'))
  .map(s => path.basename(s, '.js'))

const availableScripts = `The available scripts are: ${scripts
  .map(s => chalk.cyan(s))
  .join(', ')}.`

if (!script) {
  console.error('Missing script name.')
  console.error(availableScripts)
  process.exit(1)
}

if (!scripts.includes(script)) {
  console.error(`Unknown script ${chalk.cyan(script)}.`)
  console.error(availableScripts)
  console.error(`Perhaps you need to update ${chalk.cyan(pkg.name)}?`)
  process.exit(1)
}

require(`../scripts/${script}`)(args.slice(1))
