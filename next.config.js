module.exports = {
  target: 'serverless',

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    config.node.fs = 'empty';

    return config;
  },

  env: {
    SERVER_URL: process.env.SERVER_URL,
    GA: process.env.GA,
  },
};
