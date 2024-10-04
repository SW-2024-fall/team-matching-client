module.exports = function (api) {
  api.cache(true);

  const presets = [
    'module-resolver',
    {
      root: ['./src'],
      extensions: [
        '.ios.js',
        '.android.js',
        '.js',
        '.ios.jsx',
        '.android.jsx',
        '.jsx',
        '.jsx',
        '.js',
        '.json',
      ],
    },
  ];

  return {
    presets: ['babel-preset-expo'],
  };
};
