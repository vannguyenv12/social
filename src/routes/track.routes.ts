import { Router } from 'express'
import { trackController } from '~/features/track/controllers/track.controllers'
import { authMiddleware } from '~/globals/auth-middleware'

const trackRoutes = Router()

trackRoutes.post('/', authMiddleware.verifyUser, trackController.add)
trackRoutes.get('/', trackController.getAll)

export default trackRoutes
