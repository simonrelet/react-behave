'use strict'

function createBabelConfig(options) {
  return {
    babelrc: false,
    presets: [
      [require.resolve('@babel/preset-env'), options],
      require.resolve('@babel/preset-react'),
    ],
    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: false },
      ],
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-transform-async-to-generator'),
    ],
  }
}

module.exports = createBabelConfig
