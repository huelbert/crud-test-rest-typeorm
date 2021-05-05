import { expect } from 'chai'

import Database from '../../../src/database'
import dbConfig from '../../../src/config/database'
import ReservationResolver from '../../../src/graphql/resolvers/ReservationResolver'
import ReservationCreate from '../../../src/entities/ReservationCreate'
import ReservationUpdate from '../../../src/entities/ReservationUpdate'
import { clearTableBook, createBook } from '../../resources/book-seeder'
import {
  clearTableStudent,
  createStudent
} from '../../resources/student-seeder'
import {
  clearTableReservation,
  createReservation,
  reservationData,
  reservationId
} from '../../resources/reservation-seeder'
import Reservation from '../../../src/entities/Reservation.DataMapper'

import date from '../../../src/utils/date'

describe('src/graphql/resolvers/ReservationResolver', () => {
  beforeEach(async () => {
    await Database.init(dbConfig)
    await clearTableReservation()
    await clearTableStudent()
    await clearTableBook()

    await createBook()
    await createStudent()
  })

  it('reservations - espera retornar um array de reservation', async () => {
    const resolver = new ReservationResolver()
    await createReservation()
    const result = await resolver.reservations()
    const reservation = new Reservation()
    Object.assign(reservation, {
      id: '190a1b2a-66f5-4ed6-859b-8f411d9ce170',
      studentId: '5a0a1b2a-66f5-4ed6-859b-8f411d9ce170',
      bookId: '180a1b2a-66f5-4ed6-859b-8f411d9ce170',
      reservationDate: new Date(2021, 0, 1),
      returnDate: new Date(2021, 0, 8),
      createdAt: new Date(2021, 0, 1, 10, 30, 0),
      updatedAt: new Date(2021, 0, 1, 10, 30, 0)
    })
    expect(result).to.be.eql([reservation])
  })

  it('reservation - espera retornar um objeto de reservation', async () => {
    const resolver = new ReservationResolver()
    await createReservation()
    const result = await resolver.reservation(reservationId)
    const reservation = new Reservation()
    Object.assign(reservation, {
      id: '190a1b2a-66f5-4ed6-859b-8f411d9ce170',
      studentId: '5a0a1b2a-66f5-4ed6-859b-8f411d9ce170',
      bookId: '180a1b2a-66f5-4ed6-859b-8f411d9ce170',
      reservationDate: new Date(2021, 0, 1),
      returnDate: new Date(2021, 0, 8),
      createdAt: new Date(2021, 0, 1, 10, 30, 0),
      updatedAt: new Date(2021, 0, 1, 10, 30, 0)
    })

    expect(result).to.be.eql(reservation)
  })

  it('createReservation - espera retornar um objeto de reservation', async () => {
    const resolver = new ReservationResolver()
    const reservation = new ReservationCreate()
    reservation.studentId = reservationData.studentId
    reservation.bookId = reservationData.bookId
    const result = await resolver.createReservation(reservation)

    expect(result).to.deep.include({
      studentId: '5a0a1b2a-66f5-4ed6-859b-8f411d9ce170',
      bookId: '180a1b2a-66f5-4ed6-859b-8f411d9ce170'
    })
  })

  it('updateReservation - espera retornar um objeto de reservation', async () => {
    const resolver = new ReservationResolver()
    await createReservation()
    const reservation = new ReservationUpdate()
    reservation.returnDate = date.addDays(new Date(), 10)
    const result = await resolver.updateReservation(reservationId, reservation)

    expect(result).to.deep.include({
      id: '190a1b2a-66f5-4ed6-859b-8f411d9ce170',
      studentId: '5a0a1b2a-66f5-4ed6-859b-8f411d9ce170',
      bookId: '180a1b2a-66f5-4ed6-859b-8f411d9ce170'
    })
  })

  it('deleteReservation - espera retornar um objeto com status igual true', async () => {
    const resolver = new ReservationResolver()
    await createReservation()
    const result = await resolver.deleteReservation(reservationId)

    expect(result).to.be.eql({ status: true })
  })
})
