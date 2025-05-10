import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.string().required(),
  POKEAPI: Joi.string().required(),
  PORT: Joi.number().required().default(3000),
  NODE_ENV: Joi.string().required().default('dev'),
});
