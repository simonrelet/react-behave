'use strict'

function createBabelConfig({ modules }) {
  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        { modules: modules === 'es' ? false : modules },
      ],
      [require.resolve('@babel/preset-react'), { useBuiltIns: true }],
    ],
    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true },
      ],
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-transform-async-to-generator'),
      [
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        { loose: true, useBuiltIns: true },
      ],
    ],
  }
}

module.exports = createBabelConfig
