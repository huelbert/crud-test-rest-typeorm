import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import App from '../../../src/app'
import Database from '../../../src/database'
import dbConfig from '../../../src/config/database'
import {
  clearTableStudent,
  createStudent
} from '../../resources/student-seeder'
import { clearTableBook, createBook } from '../../resources/book-seeder'
import {
  RESERVATIONS,
  RESERVATION,
  CREATE_RESERVATION,
  UPDATE_RESERVATION,
  DELETE_RESERVATION
} from '../../helpers/gql/reservation'
import {
  clearTableReservation,
  createReservation,
  reservationData,
  reservationId
} from '../../resources/reservation-seeder'

chai.use(chaiHTTP)

const url = '/graphql'

describe('reservation - API GraphQL', () => {
  beforeEach(async () => {
    await Database.init(dbConfig)
    await clearTableReservation()
    await clearTableStudent()
    await clearTableBook()

    await createBook()
    await createStudent()
  })

  it('reservations - espera retornar um array de reservation', async () => {
    await createReservation()
    const app = await App.startServer()
    const body = RESERVATIONS()
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        reservations: [
          {
            book: {
              name: 'Book X'
            },
            reservationDate: '2021-01-01T03:00:00.000Z',
            returnDate: '2021-01-08T03:00:00.000Z',
            student: {
              name: 'Student Y',
              phone: '+5535999998888'
            }
          }
        ]
      }
    })
  })

  it('reservation - espera retornar um objeto de reservation', async () => {
    await createReservation()
    const app = await App.startServer()
    const body = RESERVATION({ id: reservationId })
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        reservation: {
          book: {
            name: 'Book X'
          },
          reservationDate: '2021-01-01T03:00:00.000Z',
          returnDate: '2021-01-08T03:00:00.000Z',
          student: {
            name: 'Student Y',
            phone: '+5535999998888'
          }
        }
      }
    })
  })

  it('createReservation - espera retornar um objeto de reservation', async () => {
    const app = await App.startServer()
    const variables = {
      studentId: reservationData.studentId,
      bookId: reservationData.bookId
    }
    const body = CREATE_RESERVATION(variables)
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        createReservation: {
          book: {
            name: 'Book X'
          },
          student: {
            name: 'Student Y',
            phone: '+5535999998888'
          }
        }
      }
    })
  })

  it('updateReservation - espera retornar um objeto de reservation', async () => {
    await createReservation()
    const app = await App.startServer()
    const variables = {
      id: reservationId,
      returnDate: '2021-01-15'
    }
    const body = UPDATE_RESERVATION(variables)
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        updateReservation: {
          book: {
            name: 'Book X'
          },
          student: {
            name: 'Student Y',
            phone: '+5535999998888'
          },
          returnDate: '2021-01-14T03:00:00.000Z'
        }
      }
    })
  })

  it('deleteReservation - espera retornar um objeto com status igual true', async () => {
    await createReservation()
    const app = await App.startServer()
    const variables = {
      id: reservationId
    }
    const body = DELETE_RESERVATION(variables)
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: { deleteReservation: { status: true } }
    })
  })
})
