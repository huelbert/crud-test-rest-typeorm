import { Field, InputType } from 'type-graphql'

import Student from './Student.DataMapper'

@InputType()
export default class StudentCreate extends Student {
  @Field()
  public name: string

  @Field({ nullable: true })
  public phone?: string
}
