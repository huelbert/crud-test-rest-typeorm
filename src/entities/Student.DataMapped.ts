import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

import uuid from '../utils/uuid'

/* Data Mapper Pattern */

@Entity({ name: 'students' })
export default class Student {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ type: 'text', name: 'name' })
  public name: string

  @Column({ type: 'text', name: 'phone' })
  public phone: string

  @Column({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date

  @Column({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date

  @BeforeInsert()
  generateId() {
    this.id = uuid.v4()
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
