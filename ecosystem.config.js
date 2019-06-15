module.exports = {
  apps: [
    {
      name: "API",
      script: "./frontend/app.js",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      }
    }
  ],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH key path, default to $HOME/.ssh
      key: "$HOME/.ssh/somekey.pem",
      // SSH user
      user: "ubuntu",
      // SSH host
      host: ["192.168.0.13"],
      // GIT remote/branch
      ref: "origin/master",
      // GIT remote
      repo: "git@github.com:Username/repository.git",
      // path in the server
      path: "/var/www/my-repository",
      // post-deploy action
      "post-deploy": "npm install"
    }
  }
};
