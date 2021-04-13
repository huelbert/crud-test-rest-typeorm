import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

import uuid from '../utils/uuid'

/* Active Record Pattern */

@Entity({ name: 'students' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public phone: string

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
