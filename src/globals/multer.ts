import multer, { FileFilterCallback } from 'multer'
import fs from 'fs'
import path from 'path'
import { BadRequestError } from './error-handler'

const audioMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (_req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (audioMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new BadRequestError('Only audio files are allowed'))
  }
}

export const setupFileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.resolve(__dirname, '../../uploads')
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true })
      }
      cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 20 * 1024 * 1024 // Optional: limit file size to 10MB
    }
  })
  return upload
}
