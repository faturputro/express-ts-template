module.exports = {
  apps: [{
    name: 'api',
    script: './dist/index.js',
    instances: 1,
    autorestart: true,
    wait_ready: true,
    listen_timeout: 10000,
    watch: false,
    env: {
      NODE_ENV: 'production',
    },
  }],
};
