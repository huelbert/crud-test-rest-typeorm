import { registerEnumType } from 'type-graphql'
import {
  DeepPartial,
  EntityRepository,
  FindConditions,
  Repository
} from 'typeorm'

import Reservation from '../entities/Reservation.DataMapper'

@EntityRepository(Reservation)
export default class ReservationRepository extends Repository<Reservation> {
  async createAndReturn(
    data: DeepPartial<Reservation>
  ): Promise<DeepPartial<Reservation>> {
    const reservation = this.create(data)
    const registry = await this.save(reservation)

    const {
      id,
      studentId,
      bookId,
      reservationDate,
      returnDate,
      createdAt,
      updatedAt
    } = registry

    return {
      id,
      studentId,
      bookId,
      reservationDate,
      returnDate,
      createdAt,
      updatedAt
    }
  }

  async updateAndReturn(
    criteria: FindConditions<Reservation>,
    data: DeepPartial<Reservation>
  ): Promise<Reservation> {
    const result = await this.createQueryBuilder()
      .update(Reservation)
      .set(data)
      .where(criteria)
      .returning('*')
      .execute()

    const {
      id,
      student_id,
      book_id,
      reservation_date,
      return_date,
      created_at,
      updated_at
    } = result.raw[0]

    const reservation = new Reservation()
    reservation.id = id
    reservation.studentId = student_id
    reservation.bookId = book_id
    reservation.reservationDate = reservation_date
    reservation.returnDate = return_date
    reservation.createdAt = created_at
    reservation.updatedAt = updated_at

    return reservation
  }
}
