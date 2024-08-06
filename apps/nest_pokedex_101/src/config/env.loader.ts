export const EnvConfiguration = () => ({
  port: +process.env.PORT || 3000,
  mongodb_uri: process.env.MONGODB_URI,
  limit: +process.env.LIMIT || 10,
  skip: +process.env.SKIP || 0,
});
