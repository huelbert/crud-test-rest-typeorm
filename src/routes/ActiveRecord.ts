import { Router } from 'express'

import StudentController from '../controllers/StudentController.ActiveRecord'

const routes = Router()

routes.get('/student', StudentController.index)
routes.get('/student/:id', StudentController.show)
routes.post('/student', StudentController.create)
routes.put('/student/:id', StudentController.update)
routes.delete('/student/:id', StudentController.delete)

export default routes
