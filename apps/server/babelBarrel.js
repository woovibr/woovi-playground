const babelJest = require('babel-jest');

const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: []
};

const barrelConfig = {
  ...config,
  plugins: [
    ...config.plugins,
    'transform-barrels',
  ]
}

module.exports = babelJest.createTransformer(barrelConfig);
