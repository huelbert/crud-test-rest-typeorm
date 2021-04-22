import { Router } from 'express'

import ActiveRecord from './ActiveRecord'
import DataMapper from './DataMapper'
import errorHandler from '../middlewares/errorHandler'

const routes = Router()

routes.use('/active-record', ActiveRecord)
routes.use('/data-mapper', DataMapper)
routes.use(errorHandler)

export default routes
