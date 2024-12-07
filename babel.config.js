module.exports = function (api) {
  api.cache(true);

  const plugins = [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@layout': './src/layout',
          '@styles': './src/styles',
          '@pages': './src/pages',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ios.jsx', '.android.jsx', '.jsx', '.json'],
      },
    ],
  ];

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
