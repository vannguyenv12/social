import express, { NextFunction, Request, Response } from 'express'
import { Application } from 'express'
import HTTP_STATUS from 'http-status-codes'
import path from 'path'
import cors from 'cors'
import { CustomError, IErrorResponse } from './globals/error-handler'
import applicationRoutes from './routes/app.routes'

export class Server {
  private app: Application

  constructor(app: Application) {
    this.app = app
  }

  public start(): void {
    this.setupStandardMiddleware()
    this.setupStaticFile()
    this.setupRoutes()
    this.globalErrorHandler()
    this.startHttpServer()
  }

  private setupStandardMiddleware(): void {
    this.app.use(
      cors({
        origin: '*'
      })
    )
    this.app.use(express.json())
  }

  private setupStaticFile(): void {
    const uploadsPath = path.resolve(__dirname, '../uploads')

    this.app.use('/uploads', express.static(uploadsPath))
  }

  private globalErrorHandler(): void {
    this.app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: `${req.originalUrl} not found`
      })
    })

    this.app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      console.log('>> check error', error)

      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors())
      }
      next()
    })
  }

  private setupRoutes(): void {
    applicationRoutes(this.app)
  }

  private startHttpServer() {
    const port = process.env.PORT || 5000

    this.app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`)
    })
  }
}
