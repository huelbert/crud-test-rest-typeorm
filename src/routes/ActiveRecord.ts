import { Router } from 'express'

import StudentController from '../controllers/StudentController.ActiveRecord'
import BookController from '../controllers/BookController.ActiveRecord'
import ReservationController from '../controllers/ReservationController.ActiveRecord'

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

routes.get('/reservation', ReservationController.index)
routes.get('/reservation/:id', ReservationController.show)
routes.post('/reservation', ReservationController.create)
routes.put('/reservation/:id', ReservationController.update)
routes.delete('/reservation/:id', ReservationController.delete)

export default routes
