import { Router } from 'express'
import { authController } from '~/features/user/controllers/auth.controllers'
import { userSchemaRegister } from '~/features/user/schemas/user.schemas'
import { authMiddleware } from '~/globals/auth-middleware'
import { validate } from '~/globals/validate-middleware'

const authRoute = Router()

authRoute.post('/auth/register', validate(userSchemaRegister), authController.register)
authRoute.post('/auth/login', authController.login)
authRoute.post('/auth/me', authMiddleware.verifyUser, authController.getMe)

export default authRoute
