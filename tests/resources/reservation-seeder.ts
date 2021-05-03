import { getManager } from 'typeorm'

import { studentId } from '../resources/student-seeder'
import { bookId } from '../resources/book-seeder'

export const reservationId = '190a1b2a-66f5-4ed6-859b-8f411d9ce170'

export const reservationData = {
  id: reservationId,
  studentId: studentId,
  bookId: bookId,
  reservationDate: '2021-01-01',
  returnDate: '2021-01-08'
}

export function createReservation(): Promise<any> {
  const reservation = [
    reservationData.id,
    reservationData.studentId,
    reservationData.bookId,
    reservationData.reservationDate,
    reservationData.returnDate,
    new Date(2021, 0, 1, 10, 30, 0), // createdAt
    new Date(2021, 0, 1, 10, 30, 0) // updatedAt
  ]

  const sql = `INSERT INTO RESERVATIONS 
  (id, student_id, book_id, reservation_date, return_date, created_at, updated_at) VALUES 
  ($1, $2, $3, $4, $5, $6, $7)`

  return getManager().query(sql, reservation)
}

export function clearTableReservation(): Promise<any> {
  return getManager().query('DELETE FROM RESERVATIONS')
}
