const path = require('path');

module.exports = {
  // ... other webpack config options ...
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      fs: require.resolve("fs"),
    }
  }
};