import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm'

import date from '../utils/date'
import uuid from '../utils/uuid'

/* Active Record Pattern */

@Entity({ name: 'reservations' })
export default class Reservation extends BaseEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column({ type: 'uuid', name: 'student_id' })
  public studentId: string

  @Column({ type: 'uuid', name: 'book_id' })
  public bookId: string

  @Column({ type: 'date', name: 'reservation_date' })
  public reservationDate: Date

  @Column({ type: 'date', name: 'return_date' })
  public returnDate: Date

  @Column({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date

  @Column({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date

  @BeforeInsert()
  generateId() {
    this.id = uuid.v4()
  }

  @BeforeInsert()
  setReservationDate() {
    this.reservationDate = new Date()
  }

  @BeforeInsert()
  setReturnDate() {
    this.returnDate = date.addDays(new Date(), 7)
  }

  @BeforeInsert()
  setCreateDate(): void {
    this.createdAt = new Date()
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdateDate(): void {
    this.updatedAt = new Date()
  }
}
