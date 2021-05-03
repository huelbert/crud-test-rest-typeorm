import { Router } from 'express'

import StudentControllerRepository from '../controllers/StudentController.DataMapper-Repository'
import BookControllerRepository from '../controllers/BookController.DataMapper-Repository'
import ReservationControllerRepository from '../controllers/ReservationController.DataMapper-Repository'

import StudentControllerManager from '../controllers/StudentController.DataMapper-Manager'
import BookControllerManager from '../controllers/BookController.DataMapper-Manager'
import ReservationControllerManager from '../controllers/ReservationController.DataMapper-Manager'

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

routes.get('/manager/student', StudentControllerManager.index)
routes.get('/manager/student/:id', StudentControllerManager.show)
routes.post('/manager/student', StudentControllerManager.create)
routes.put('/manager/student/:id', StudentControllerManager.update)
routes.delete('/manager/student/:id', StudentControllerManager.delete)

routes.get('/manager/book', BookControllerManager.index)
routes.get('/manager/book/:id', BookControllerManager.show)
routes.post('/manager/book', BookControllerManager.create)
routes.put('/manager/book/:id', BookControllerManager.update)
routes.delete('/manager/book/:id', BookControllerManager.delete)

routes.get('/manager/reservation', ReservationControllerManager.index)
routes.get('/manager/reservation/:id', ReservationControllerManager.show)
routes.post('/manager/reservation', ReservationControllerManager.create)
routes.put('/manager/reservation/:id', ReservationControllerManager.update)
routes.delete('/manager/reservation/:id', ReservationControllerManager.delete)

export default routes
