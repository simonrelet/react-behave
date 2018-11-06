#!/usr/bin/env node
'use strict'

process.on('unhandledRejection', err => {
  throw err
})

const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const pkg = require('../package')
const logger = require('../lib/logger')

const args = process.argv.slice(2)
const script = args[0]
const scripts = fs
  .readdirSync(path.join(__dirname, '..', 'scripts'))
  .map(s => path.basename(s, '.js'))

const availableScripts = `The available scripts are: ${scripts
  .map(s => chalk.cyan(s))
  .join(', ')}.`

if (!script) {
  logger.error('Missing script name.', availableScripts)
  process.exit(1)
}

if (!scripts.includes(script)) {
  logger.error(
    `Unknown script ${chalk.cyan(script)}.`,
    availableScripts,
    `Perhaps you need to update ${chalk.cyan(pkg.name)}?`
  )
  process.exit(1)
}

async function run() {
  try {
    const fn = require(`../scripts/${script}`)
    await fn(args.slice(1))
  } catch (err) {
    process.exit(1)
  }
}

run()
