module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.(pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'web-dev Resume Final.pdf',
              publicPath: '/', // Adjust this path as needed
            },
          },
        ],
      });
  
      return config;
    },
  };
  