#!/usr/bin/env node

'use strict';

const spawn = require('../lib/safeSpawn');

process.on('unhandledRejection', err => {
  throw err;
});

const args = process.argv.slice(2);
const script = args[0];

switch (script) {
  case 'build':
  case 'clean':
  case 'start': {
    const result = spawn(
      'node',
      [require.resolve(`../scripts/${script}`)].concat(args.slice(1)),
      { stdio: 'inherit' }
    );

    process.exit(result.status);
    break;
  }

  default:
    console.log(`Unknown script "${script}".`);
    console.log('Perhaps you need to update @simonrelet/react-libraries?');
    break;
}
