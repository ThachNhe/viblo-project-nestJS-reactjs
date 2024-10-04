module.exports = {
  apps: [
    {
      name: 'nestjs-app',
      script: 'node_modules/.bin/ts-node',
      args: '-r tsconfig-paths/register src/main.ts',
      watch: ['src'], // Theo dõi các thay đổi trong thư mục src
      ignore_watch: ['node_modules', 'logs'], // Bỏ qua node_modules và logs
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
