import { Router } from 'express'

import StudentController from '../controllers/StudentController.ActiveRecord'
import BookController from '../controllers/BookController.ActiveRecord'

const routes = Router()

routes.get('/student', StudentController.index)
routes.get('/student/:id', StudentController.show)
routes.post('/student', StudentController.create)
routes.put('/student/:id', StudentController.update)
routes.delete('/student/:id', StudentController.delete)

routes.get('/book', BookController.index)
routes.get('/book/:id', BookController.show)
routes.post('/book', BookController.create)
routes.put('/book/:id', BookController.update)
routes.delete('/book/:id', BookController.delete)

export default routes
