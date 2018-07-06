'use strict';

const gzipSize = require('gzip-size');
const fs = require('fs-extra');
const bytes = require('bytes');
const chalk = require('chalk');

const snapshotFile = '.size-snapshot.json';

function formatSize(d) {
  return chalk.bold(
    bytes.format(d, { thousandsSeparator: ',', unitSeparator: ' ', unit: 'B' })
  );
}

function outputSizes(gzippedSize, outputFile) {
  const infoString =
    `\nComputed sizes of "${outputFile}"\n` +
    `  download size (minified and gzipped): ${formatSize(gzippedSize)}\n`;

  console.log(infoString);
}

function writeSnapshot(gzippedSize, outputFile) {
  const sizes = fs.readJSONSync(snapshotFile, { throws: false }) || {};
  sizes[outputFile] = {
    minified: gzippedSize,
  };
  fs.outputJSONSync(snapshotFile, sizes, { spaces: 2 });
  return Promise.resolve();
}

function snapshotCSSSize(outputFile) {
  return css =>
    gzipSize(css)
      .then(gzippedSize => {
        outputSizes(gzippedSize, outputFile);
        return writeSnapshot(gzippedSize, outputFile);
      })
      .then(() => css);
}

module.exports = snapshotCSSSize;
