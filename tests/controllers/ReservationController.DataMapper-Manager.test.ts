import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import App from '../../src/app'
import Database from '../../src/database'
import dbConfig from '../../src/config/database'
import { clearTableStudent, createStudent } from '../resources/student-seeder'
import { clearTableBook, createBook } from '../resources/book-seeder'
import {
  clearTableReservation,
  createReservation,
  reservationData,
  reservationId
} from '../resources/reservation-seeder'

chai.use(chaiHTTP)

const url = '/v1/data-mapper/manager/reservation'

describe('reservation - Data Mapper Pattern (Manager)', () => {
  beforeEach(async () => {
    await Database.init(dbConfig)
    await clearTableReservation()
    await clearTableStudent()
    await clearTableBook()

    await createBook()
    await createStudent()
  })

  it('index', async () => {
    await createReservation()
    const app = await App.startServer()
    const response = await chai.request(app).get(url)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('array')
    expect(response.body[0].id).to.be.a('string')
    expect(response.body[0].studentId).to.be.a('string')
    expect(response.body[0].bookId).to.be.a('string')
    expect(response.body[0].reservationDate).to.be.a('string')
    expect(response.body[0].returnDate).to.be.a('string')
    expect(response.body[0].createdAt).to.be.a('string')
    expect(response.body[0].updatedAt).to.be.a('string')
  })

  it('show', async () => {
    await createReservation()
    const app = await App.startServer()
    const response = await chai.request(app).get(`${url}/${reservationId}`)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('object')
    expect(response.body.id).to.be.equal(reservationId)
    expect(response.body.studentId).to.be.a('string')
    expect(response.body.bookId).to.be.a('string')
    expect(response.body.reservationDate).to.be.a('string')
    expect(response.body.returnDate).to.be.a('string')
    expect(response.body.createdAt).to.be.a('string')
    expect(response.body.updatedAt).to.be.a('string')
  })

  it('create', async () => {
    const app = await App.startServer()
    const response = await chai.request(app).post(url).send(reservationData)

    expect(response.status).to.be.equal(201)
    expect(response.body).to.be.a('object')
    expect(response.body.id).to.be.a('string')
    expect(response.body.studentId).to.be.a('string')
    expect(response.body.bookId).to.be.a('string')
    expect(response.body.reservationDate).to.be.a('string')
    expect(response.body.returnDate).to.be.a('string')
    expect(response.body.createdAt).to.be.a('string')
    expect(response.body.updatedAt).to.be.a('string')
  })

  it('update', async () => {
    await createReservation()
    const update = { returnDate: '1999-12-31T02:00:00.000Z' }
    const app = await App.startServer()
    const response = await chai
      .request(app)
      .put(`${url}/${reservationId}`)
      .send(update)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('object')
    expect(response.body.id).to.be.a('string')
    expect(response.body.studentId).to.be.a('string')
    expect(response.body.bookId).to.be.a('string')
    expect(response.body.reservationDate).to.be.a('string')
    expect(response.body.returnDate).to.be.a('string')
    expect(response.body.createdAt).to.be.a('string')
    expect(response.body.updatedAt).to.be.a('string')
    expect(response.body.returnDate).to.be.equal(update.returnDate)
  })

  it('delete', async () => {
    await createReservation()
    const app = await App.startServer()
    const response = await chai.request(app).delete(`${url}/${reservationId}`)

    await clearTableStudent()
    await clearTableBook()

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('object')
    expect(response.body).to.has.property('raw')
    expect(response.body.affected).to.be.a('number')
  })
})
