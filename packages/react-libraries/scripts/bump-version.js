'use strict'

const chalk = require('chalk')
const fs = require('fs-extra')
const moment = require('moment')
const semver = require('semver')
const logger = require('../lib/logger')
const generateReadme = require('../lib/generateReadme')

const pkg = fs.readJSONSync('package.json')

const changelogPath = 'CHANGELOG.md'

function updatePackage(version) {
  pkg.version = version
  fs.writeJSONSync('package.json', pkg, { spaces: 2 })
  logger.generated('package.json', 'package.json')
}

function updateChangelog(version) {
  if (fs.existsSync(changelogPath)) {
    const date = moment().format('MMMM D, YYYY')
    const changelog = fs
      .readFileSync(changelogPath, 'utf8')
      .replace('## Unreleased', `## ${version} (${date})`)

    fs.writeFileSync(changelogPath, changelog)
    logger.generated(changelogPath, changelogPath)
  }
}

function bumpVersion(args) {
  const readmeInput =
    args[0] === '--readme' || args[0] === '-r' ? args[1] : undefined

  const version = args[args.length - 1]

  if (!version) {
    logger.error('Missing version number.')
    process.exit(1)
  }

  if (!semver.valid(version)) {
    logger.error(
      `The version ${chalk.cyan(version)}` +
        ` is not a valid semantic version number.`
    )
    process.exit(1)
  }

  if (semver.lte(version, pkg.version)) {
    logger.log(
      `The version number must be bigger than the current one.`,
      `  Received: ${chalk.cyan(version)}`,
      `  Current:  ${chalk.cyan(pkg.version)}`
    )
    process.exit(1)
  }

  updatePackage(version)
  updateChangelog(version)
  generateReadme(readmeInput)
}

module.exports = bumpVersion
