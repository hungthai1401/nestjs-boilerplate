export default {
  host: process.env.DB_HOST,
  type: process.env.DB_CONNECTION,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/app/entities/*.entity.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
