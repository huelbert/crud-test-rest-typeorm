import { Router } from 'express'

import StudentControllerRepository from '../controllers/StudentController.DataMapper-Repository'
import BookControllerRepository from '../controllers/BookController.DataMapper-Repository'
import ReservationControllerRepository from '../controllers/ReservationController.DataMapper-Repository'

const routes = Router()

routes.get('/repository/student', StudentControllerRepository.index)
routes.get('/repository/student/:id', StudentControllerRepository.show)
routes.post('/repository/student', StudentControllerRepository.create)
routes.put('/repository/student/:id', StudentControllerRepository.update)
routes.delete('/repository/student/:id', StudentControllerRepository.delete)

routes.get('/repository/book', BookControllerRepository.index)
routes.get('/repository/book/:id', BookControllerRepository.show)
routes.post('/repository/book', BookControllerRepository.create)
routes.put('/repository/book/:id', BookControllerRepository.update)
routes.delete('/repository/book/:id', BookControllerRepository.delete)

routes.get('/repository/reservation', ReservationControllerRepository.index)
routes.get('/repository/reservation/:id', ReservationControllerRepository.show)
routes.post('/repository/reservation', ReservationControllerRepository.create)
routes.put(
  '/repository/reservation/:id',
  ReservationControllerRepository.update
)
routes.delete(
  '/repository/reservation/:id',
  ReservationControllerRepository.delete
)

export default routes
