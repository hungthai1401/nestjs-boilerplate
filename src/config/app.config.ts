export default (): Record<string, any> => ({
  appEnv: process.env.APP_ENV || 'local',
  appPort: parseInt(process.env.APP_PORT) || 3000,
  appApiPrefix: process.env.APP_API_PREFIX || 'api',
  appBcryptSalt: parseInt(process.env.APP_BCRYPT_SALT, 10) || 10,
});
