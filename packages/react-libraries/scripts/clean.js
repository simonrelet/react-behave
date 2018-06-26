'use strict';

const chalk = require('chalk');
const fs = require('fs-extra');

const files = ['build', 'build-storybook', 'coverage'].filter(fs.existsSync);

function clean() {
  Promise.all(files.map(file => fs.remove(file))).then(() => {
    if (files.length) {
      const s = files.length > 1 ? 's' : '';
      const deletedFiles = files.map(f => chalk.red(f)).join(', ');
      console.log(`Deleted file${s}: ${deletedFiles}.`);
    } else {
      console.log('Already clean.');
    }
  });
}

module.exports = clean;
