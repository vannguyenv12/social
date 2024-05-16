import { NextFunction, Request, Response } from 'express'
import joi, { Schema, ValidationErrorItem } from 'joi'

const formatJoiErrors = (errors: ValidationErrorItem[]) => {
  return errors.map((err) => err.message.replace(/['"]/g, ''))
}

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      const formattedErrors = formatJoiErrors(error.details)
      return res.status(400).json({ errors: formattedErrors })
    }
    next()
  }
}
