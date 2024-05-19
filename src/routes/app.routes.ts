import { Application } from 'express'
import authRoute from './auth.routes'
import userRoutes from './user.routes'

const applicationRoutes = (app: Application): void => {
  app.use('/api/v1', authRoute)
  app.use('/api/v1/users', userRoutes)
}

export default applicationRoutes
