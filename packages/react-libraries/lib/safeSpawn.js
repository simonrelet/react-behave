'use strict';

const spawn = require('cross-spawn');

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

module.exports = safeSpawn;
