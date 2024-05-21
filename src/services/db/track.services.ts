import { Track } from '@prisma/client'
import { AuthPayload } from '~/features/user/types/user.types'
import prisma from '~/prisma.client'

class TrackService {
  public async addTrack(requestBody: Track, currentUser: AuthPayload): Promise<Track> {
    return await prisma.track.create({
      data: {
        ...requestBody,
        uploaderId: parseInt(currentUser.id)
      }
    })
  }

  public async getTracks(category: string, limit: number = 10): Promise<Track[]> {
    return await prisma.track.findMany({
      include: {
        user: true
      },
      where: {
        category: category
      }
    })
  }
}

export const trackService: TrackService = new TrackService()
