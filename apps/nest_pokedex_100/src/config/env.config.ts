export const EnvConfiguration = () => ({
  // always string
  environment: process.env.NODE_ENV || 'dev',
  mongodbUri: process.env.MONGODB_URI,
  port: +process.env.PORT || 3000,
  // port: parseInt(process.env.PORT, 10) || 3000,
  defaultLimit: +process.env.DEFAULT_LIMIT || 4,
});
