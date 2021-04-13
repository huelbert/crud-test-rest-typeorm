import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

import uuid from '../utils/uuid'

/* Data Mapper Pattern */

@Entity({ name: 'reservations' })
export default class Reservation {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ type: 'uuid', name: 'student_id' })
  public studentId: string

  @Column({ type: 'uuid', name: 'book_id' })
  public bookId: string

  @Column({ type: 'date', name: 'reservation_date' })
  public reservationDate: Date

  @Column({ type: 'date', name: 'return_date' })
  public returnDate: Date

  @Column({ type: 'date', name: 'created_at' })
  public createdAt: Date

  @Column({ type: 'date', name: 'updated_at' })
  public updatedAt: Date

  @BeforeInsert()
  generateId() {
    this.id = uuid.v4()
  }

  @BeforeInsert()
  setDates() {
    this.reservationDate = new Date()
    this.returnDate.setDate(this.reservationDate.getDate() + 7)
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date()
  }
}
