import { Router } from 'express'

import ActiveRecord from './ActiveRecord'

import errorHandler from '../middlewares/errorHandler'

const routes = Router()

routes.use('/active-record', ActiveRecord)
routes.use(errorHandler)

export default routes
