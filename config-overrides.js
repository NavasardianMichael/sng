module.exports = {
  webpack: function(config, env) {
    if (process.env.npm_lifecycle_event === 'dev:ie') {
      config.entry.shift(); // remove webpackHotDevClient (first as default)
    }

    return config;
  },
};
