import { Request, Response, NextFunction } from 'express'
import { userService } from '~/services/db/user.services'
import { AuthPayload } from '../types/user.types'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: AuthPayload
    }
  }
}

class AuthController {
  public async register(req: Request, res: Response) {
    const { user, token } = await userService.createUser(req.body)

    return res.json({
      message: 'success',
      data: {
        user,
        access_token: token
      }
    })
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body
    const { user, token } = await userService.loginUser(email, password)

    return res.json({
      message: 'success',
      data: {
        user,
        access_token: token
      }
    })
  }

  public async getMe(req: Request, res: Response) {
    return res.json({
      message: 'Login Successfully!',
      user: req.currentUser
    })
  }

  public async getSocialMedia(req: Request, res: Response) {
    const { type, username } = req.body

    const { user, accessToken } = await userService.getSocialMedia(type, username)

    return res.json({
      message: 'Login Successfully!',
      data: {
        user,
        access_token: accessToken
      }
    })
  }
}

export const authController: AuthController = new AuthController()
