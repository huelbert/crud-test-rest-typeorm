import { Router } from 'express'

import StudentControllerRepository from '../controllers/StudentController.DataMapper-Repository'
import BookControllerRepository from '../controllers/BookController.DataMapper-Repository'
import ReservationControllerRepository from '../controllers/ReservationController.DataMapper-Repository'

import StudentControllerManager from '../controllers/StudentController.DataMapper-Manager'
import BookControllerManager from '../controllers/BookController.DataMapper-Manager'
import ReservationControllerManager from '../controllers/ReservationController.DataMapper-Manager'

import StudentControllerQueryBuilder from '../controllers/StudentController.DataMapper-QueryBuilder'
import BookControllerQueryBuilder from '../controllers/BookController.DataMapper-QueryBuilder'
import ReservationControllerQueryBuilder from '../controllers/ReservationController.DataMapper-QueryBuilder'

import StudentControllerCustomRepository from '../controllers/StudentController.DataMapper-CustomRepository'
import BookControllerCustomRepository from '../controllers/BookController.DataMapper-CustomRepository'
import ReservationControllerCustomRepository from '../controllers/ReservationController.DataMapper-CustomRepository'

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

routes.get('/query-builder/student', StudentControllerQueryBuilder.index)
routes.get('/query-builder/student/:id', StudentControllerQueryBuilder.show)
routes.post('/query-builder/student', StudentControllerQueryBuilder.create)
routes.put('/query-builder/student/:id', StudentControllerQueryBuilder.update)
routes.delete(
  '/query-builder/student/:id',
  StudentControllerQueryBuilder.delete
)

routes.get('/query-builder/book', BookControllerQueryBuilder.index)
routes.get('/query-builder/book/:id', BookControllerQueryBuilder.show)
routes.post('/query-builder/book', BookControllerQueryBuilder.create)
routes.put('/query-builder/book/:id', BookControllerQueryBuilder.update)
routes.delete('/query-builder/book/:id', BookControllerQueryBuilder.delete)

routes.get(
  '/query-builder/reservation',
  ReservationControllerQueryBuilder.index
)
routes.get(
  '/query-builder/reservation/:id',
  ReservationControllerQueryBuilder.show
)
routes.post(
  '/query-builder/reservation',
  ReservationControllerQueryBuilder.create
)
routes.put(
  '/query-builder/reservation/:id',
  ReservationControllerQueryBuilder.update
)
routes.delete(
  '/query-builder/reservation/:id',
  ReservationControllerQueryBuilder.delete
)

routes.get(
  '/custom-repository/student',
  StudentControllerCustomRepository.index
)
routes.get(
  '/custom-repository/student/:id',
  StudentControllerCustomRepository.show
)
routes.post(
  '/custom-repository/student',
  StudentControllerCustomRepository.create
)
routes.put(
  '/custom-repository/student/:id',
  StudentControllerCustomRepository.update
)
routes.delete(
  '/custom-repository/student/:id',
  StudentControllerCustomRepository.delete
)

routes.get('/custom-repository/book', BookControllerCustomRepository.index)
routes.get('/custom-repository/book/:id', BookControllerCustomRepository.show)
routes.post('/custom-repository/book', BookControllerCustomRepository.create)
routes.put('/custom-repository/book/:id', BookControllerCustomRepository.update)
routes.delete(
  '/custom-repository/book/:id',
  BookControllerCustomRepository.delete
)

routes.get(
  '/custom-repository/reservation',
  ReservationControllerCustomRepository.index
)
routes.get(
  '/custom-repository/reservation/:id',
  ReservationControllerCustomRepository.show
)
routes.post(
  '/custom-repository/reservation',
  ReservationControllerCustomRepository.create
)
routes.put(
  '/custom-repository/reservation/:id',
  ReservationControllerCustomRepository.update
)
routes.delete(
  '/custom-repository/reservation/:id',
  ReservationControllerCustomRepository.delete
)

export default routes
