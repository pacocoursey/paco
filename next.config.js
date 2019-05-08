const withPlugins = require('next-compose-plugins');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
});
const withOffline = require('next-offline');

module.exports = withPlugins(
  [withMDX, {
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    target: 'serverless',
  }],

  [withOffline, {
    target: 'serverless',
    workboxOpts: {
      swDest: 'static/service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'networkFirst',
          options: {
            cacheName: 'https-calls',
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  }],
);
