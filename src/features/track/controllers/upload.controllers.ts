import { Request, Response } from 'express'
import { trackService } from '~/services/db/track.services'
import HTTP_STATUS from 'http-status-codes'
import { Track } from '@prisma/client'
import { BadRequestError } from '~/globals/error-handler'

class UploadController {
  public async upload(req: Request, res: Response) {
    if (!req.file) {
      throw new BadRequestError('No file uploaded')
    }

    res.json({
      message: 'File uploaded successfully',
      data: req.file.filename
    })
  }

  public async uploadImage(req: Request, res: Response) {
    if (!req.file) {
      throw new BadRequestError('No file uploaded')
    }

    res.json({
      message: 'File uploaded successfully',
      data: req.file.filename
    })
  }
}

export const uploadController: UploadController = new UploadController()
