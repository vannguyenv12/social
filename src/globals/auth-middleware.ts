import { NextFunction, Request, Response } from 'express'
import { NotAuthorizedError } from './error-handler'
import jwt from 'jsonwebtoken'
import { AuthPayload } from '~/features/user/types/user.types'

class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction) {
    console.log('header', req.headers['authorization'])

    if (!req.headers['authorization'] || !req.headers['authorization']?.startsWith('Bearer ')) {
      throw new NotAuthorizedError('Token is not available. Please login again')
    }

    const token = req.headers['authorization'].split(' ')[1]

    console.log('>>> check token', token)

    try {
      const payload: AuthPayload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload
      req.currentUser = payload
    } catch (error) {
      throw new NotAuthorizedError('Token is invalid. Please try again!')
    }

    next()
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction) {
    if (!req.currentUser) {
      throw new NotAuthorizedError('Authentication is required to access this route')
    }

    next()
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware()
