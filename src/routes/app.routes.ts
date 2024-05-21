import { Application } from 'express'
import authRoute from './auth.routes'
import userRoutes from './user.routes'
import trackRoutes from './track.routes'

const applicationRoutes = (app: Application): void => {
  app.use('/api/v1', authRoute)
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/tracks', trackRoutes)
}

export default applicationRoutes
