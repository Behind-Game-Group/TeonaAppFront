const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.sourceExts.push('web.ts', 'web.tsx', 'web.js', 'web.jsx');

  return config;
})();
