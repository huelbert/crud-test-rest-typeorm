import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class Result {
  @Field()
  public status: boolean
}
