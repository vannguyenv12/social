import { Router } from 'express'
import { trackController } from '~/features/track/controllers/track.controllers'
import { uploadController } from '~/features/track/controllers/upload.controllers'
import { authMiddleware } from '~/globals/auth-middleware'
import { setupFileUpload } from '~/globals/multer'

const trackRoutes = Router()

trackRoutes.post('/', authMiddleware.verifyUser, trackController.add)
trackRoutes.get('/', trackController.getAll)
trackRoutes.post('/upload', authMiddleware.verifyUser, setupFileUpload().single('file'), uploadController.upload)
trackRoutes.post(
  '/upload-image',
  authMiddleware.verifyUser,
  setupFileUpload().single('file'),
  uploadController.uploadImage
)

export default trackRoutes
