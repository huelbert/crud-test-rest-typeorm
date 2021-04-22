import express, { Application } from 'express'
import morgan from 'morgan'
import 'reflect-metadata'
import 'express-async-errors'

import routes from './routes'
import Database from './database'
import dbConfig from './config/database'
import graphql from './graphql'

class App {
  private _app: Application
  private _dev: boolean
  constructor() {
    this._app = express()
    this._dev = process.env.NODE_ENV === 'development'
  }

  private middlewares() {
    this._app.use(morgan('common', { skip: () => !this._dev }))
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))

    graphql.applyMiddleware({ app: this._app, path: '/graphql' })
  }

  private routes() {
    this._app.use('/v1', routes)
  }

  public async connectDB() {
    await Database.init(dbConfig)
  }

  public async startServer() {
    await this.connectDB()
    this.middlewares()
    this.routes()

    return this._app
  }
}

export default new App()
