import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB_URI: Joi.string().required(),
  PORT: Joi.number().default(3002),
  LIMIT: Joi.number().default(10),
  SKIP: Joi.number().default(10),
});
