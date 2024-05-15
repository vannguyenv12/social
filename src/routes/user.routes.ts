import { Router } from 'express'
import { authController } from '~/features/user/controllers/auth.controllers'
import { authMiddleware } from '~/globals/auth-middleware'

const router = Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/me', authMiddleware.verifyUser, authController.getMe)

export default router
