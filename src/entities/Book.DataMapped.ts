import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

import uuid from '../utils/uuid'

/* Data Mapper Pattern */

@Entity({ name: 'books' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public createdAt: Date

  @Column()
  public updatedAt: Date

  @BeforeInsert()
  generateId() {
    this.id = uuid.v4()
  }

  @BeforeInsert()
  setDates() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date()
  }
}
