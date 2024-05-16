import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { userService } from '~/services/db/user.services'

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    const users: User[] = await userService.findUsers()

    res.json({
      message: 'success',
      data: users
    })
  }
}

export const userCOntroller: UserController = new UserController()
