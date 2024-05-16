import Joi from 'joi'

export const userSchemaRegister = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  address: Joi.string().min(2).required()
})

export const userSchemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
})
