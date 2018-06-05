'use strict';

const fs = require('fs');

const nodeEnv = process.env.NODE_ENV;
if (!nodeEnv) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

const dotenvFiles = [
  `.env.${nodeEnv}.local`,
  `.env.${nodeEnv}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  nodeEnv !== 'test' && `.env.local`,
  '.env',
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});
