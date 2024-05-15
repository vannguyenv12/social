import express, { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from 'http-status-codes'
import 'express-async-errors'
import router from './routes/user.routes'
import { CustomError, IErrorResponse } from './globals/error-handler'

const app = express()
const port = 5000
app.use(express.json())

// Routes
app.use('/api/v1', router)

// Error handler
app.all('*', (req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    message: `${req.originalUrl} not found`
  })
})

app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
  console.log('>> check error', error)

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(error.serializeErrors())
  }
  next()
})

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
