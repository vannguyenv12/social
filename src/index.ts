import express, { Application } from 'express'
import 'express-async-errors'
import { Server } from './setupServer'

class SoundCloudApp {
  public initialize(): void {
    const app: Application = express()
    const server: Server = new Server(app)

    server.start()
  }
}

const soundCloudApp: SoundCloudApp = new SoundCloudApp()
soundCloudApp.initialize()
