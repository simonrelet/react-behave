#!/usr/bin/env node

'use strict';

const spawn = require('cross-spawn');

process.on('unhandledRejection', err => {
  throw err;
});

const args = process.argv.slice(2);
const script = args[0];

function safeSpawn(...args) {
  const result = spawn.sync(...args);

  if (result.signal) {
    switch (result.signal) {
      case 'SIGKILL':
        console.error(
          'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        );
        break;

      case 'SIGTERM':
        console.error(
          'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        );
        break;

      default:
        break;
    }

    process.exit(1);
  }

  return result;
}

switch (script) {
  case 'build':
  case 'clean':
  case 'doc':
  case 'start': {
    const result = safeSpawn(
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
