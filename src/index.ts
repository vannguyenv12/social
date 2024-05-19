import express, { Application } from 'express'
import 'express-async-errors'
import { Server } from './setupServer'

class BaseServer {
  public initialize(): void {
    const app: Application = express()
    const server: Server = new Server(app)

    server.start()
  }
}

const baseServer: BaseServer = new BaseServer()
baseServer.initialize()
