export const EnvConfig = () => ({
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  mongodb: process.env.MONGODB,
  pokeapi: process.env.POKEAPI,
});
