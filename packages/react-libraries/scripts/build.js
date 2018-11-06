'use strict'

const babel = require('@babel/core')
const chalk = require('chalk')
const chokidar = require('chokidar')
const fs = require('fs-extra')
const glob = require('glob')
const minimist = require('minimist')
const createBabelConfig = require('../config/createBabelConfig')
const logger = require('../lib/logger')

const pkg = fs.readJSONSync('package.json')
const sourceFilesJS = glob.sync('src/**/*.js', {
  ignore: [
    '**/*.{spec,test,stories}.js',
    '**/__tests__/**',
    '**/__mocks__/**',
    '**/setupTests.js',
  ],
})

function getOutputFileName(outputFolder) {
  return filename => filename.replace(/^src/, outputFolder)
}

async function buildJS(modulesType, outputFolder) {
  const presets = createBabelConfig({ modules: modulesType })
  const outputFilename = getOutputFileName(outputFolder)

  async function transformFile(filename) {
    const config = babel.loadPartialConfig(
      Object.assign(
        {
          filename,
          caller: {
            name: 'react-libraries',
            supportsStaticESM: true,
            supportsDynamicImport: true,
          },
        },
        presets
      )
    )

    if (config) {
      const { code } = await babel.transformFileAsync(filename, config.options)
      return await fs.outputFile(outputFilename(filename), code)
    }
  }

  return await Promise.all(sourceFilesJS.map(transformFile))
}

async function copyStyle(filesToCopy, outputFolder) {
  const outputFilename = getOutputFileName(outputFolder)

  async function copyFile(filename) {
    return await fs.copyFile(filename, outputFilename(filename))
  }

  return await Promise.all(filesToCopy.map(copyFile))
}

async function buildModule(modulesType, outputFolder, filesToCopy, moduleName) {
  try {
    await buildJS(modulesType, outputFolder)

    if (filesToCopy.length) {
      await copyStyle(filesToCopy, outputFolder)
    }

    logger.log(chalk.green(`${moduleName} build successful.`))
  } catch (err) {
    logger.error(`\n${err.message}\n`, chalk.red(`${moduleName} build failed.`))
    throw err
  }
}

async function buildModules(filesToCopy) {
  if (pkg.main) {
    await buildModule('commonjs', pkg.main, filesToCopy, 'CommonJS')
  }

  if (pkg.module) {
    await buildModule('es', pkg.module, filesToCopy, 'ES modules')
  }
}

async function safeBuildModules(filesToCopy) {
  try {
    await buildModules(filesToCopy)
  } catch (_) {}
}

async function build(args) {
  args = minimist(args, {
    alias: { copy: 'c', watch: 'w' },
    boolean: '--watch',
    string: 'copy',
  })

  let filesToCopy = []

  if (args.copy != null) {
    if (typeof args.copy === 'string') {
      filesToCopy = glob.sync(args.copy)
    } else if (Array.isArray(args.copy)) {
      filesToCopy = args.copy.reduce(
        (acc, pattern) => acc.concat(glob.sync(pattern)),
        []
      )
    }
  }

  if (args.watch) {
    const watcher = chokidar.watch('src/**', { ignoreInitial: true })
    watcher.on('all', () => safeBuildModules(filesToCopy))
    safeBuildModules(filesToCopy)
  } else {
    buildModules(filesToCopy)
  }
}

module.exports = build
