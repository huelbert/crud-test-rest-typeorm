import { Field, InputType } from 'type-graphql'

import Student from './Student.DataMapper'

@InputType()
export default class StudentUpdate implements Partial<Student> {
  @Field({ nullable: true })
  public name?: string

  @Field({ nullable: true })
  public phone?: string
}
