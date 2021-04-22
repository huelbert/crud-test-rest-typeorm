import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

import uuid from '../utils/uuid'

/* Data Mapper Pattern */

@Entity({ name: 'students' })
@ObjectType()
export default class Student {
  @PrimaryColumn('uuid')
  public id: string

  @Column({ type: 'text', name: 'name' })
  @Field()
  public name: string

  @Column({ type: 'text', name: 'phone', nullable: true })
  @Field({ nullable: true })
  public phone?: string

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
