import { Router } from 'express'
import { userCOntroller } from '~/features/user/controllers/user.controllers'
import { authMiddleware } from '~/globals/auth-middleware'

const userRoutes = Router()

userRoutes.get('/', authMiddleware.verifyUser, userCOntroller.getAllUsers)

export default userRoutes
