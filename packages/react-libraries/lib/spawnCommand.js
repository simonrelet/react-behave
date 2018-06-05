'use strict';

const spawn = require('./safeSpawn');
const path = require('path');

function spawnCommand(bin, args) {
  const cmd = path.join(__dirname, '..', 'node_modules', '.bin', bin);
  return spawn('node', [cmd].concat(args), { stdio: 'inherit' });
}

module.exports = spawnCommand;
