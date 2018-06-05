'use strict';

const fs = require('fs-extra');

process.on('unhandledRejection', err => {
  throw err;
});

const files = ['build', 'build-storybook'].filter(fs.existsSync);

Promise.all(files.map(file => fs.remove(file))).then(() => {
  if (files.length) {
    console.log(`Deleted folder: ${files.join(', ')}`);
  } else {
    console.log('Already clean.');
  }
});
