import { Request, Response } from 'express'
import { trackService } from '~/services/db/track.services'
import HTTP_STATUS from 'http-status-codes'
import { Track } from '@prisma/client'

class TrackController {
  public async add(req: Request, res: Response) {
    const track = await trackService.addTrack(req.body, req.currentUser!)

    res.status(HTTP_STATUS.CREATED).json({
      message: 'success',
      data: track
    })
  }

  public async getAll(req: Request, res: Response) {
    const { category, limit } = req.params

    const tracks: Track[] = await trackService.getTracks(category, parseInt(limit))

    res.status(HTTP_STATUS.OK).json({
      message: 'success',
      data: tracks
    })
  }
}

export const trackController: TrackController = new TrackController()
