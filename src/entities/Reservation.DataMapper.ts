import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn
} from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

import Book from './Book.DataMapper'
import Student from './Student.DataMapper'
import date from '../utils/date'
import uuid from '../utils/uuid'

/* Data Mapper Pattern */

@Entity({ name: 'reservations' })
@ObjectType()
export default class Reservation {
  @PrimaryColumn('uuid')
  @Field()
  public id: string

  @Column({ type: 'uuid', name: 'student_id' })
  public studentId: string

  @Column({ type: 'uuid', name: 'book_id' })
  public bookId: string

  @Column({ type: 'timestamp', name: 'reservation_date' })
  @Field()
  public reservationDate: Date

  @Column({ type: 'timestamp', name: 'return_date' })
  @Field()
  public returnDate: Date

  @Column({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date

  @Column({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date

  @OneToOne(() => Book)
  @JoinColumn()
  @Field({ nullable: true })
  public book: Book

  @OneToOne(() => Student)
  @JoinColumn()
  @Field({ nullable: true })
  public student: Student

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
