import { Router } from 'express'

import StudentController from '../controllers/StudentController.Repository'

const routes = Router()

routes.get('/repository/student', StudentController.index)
routes.get('/repository/student/:id', StudentController.show)
routes.post('/repository/student', StudentController.create)
routes.put('/repository/student/:id', StudentController.update)
routes.delete('/repository/student/:id', StudentController.delete)

export default routes
