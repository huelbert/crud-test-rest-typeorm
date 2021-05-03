import { Field, InputType } from 'type-graphql'

import Book from './Book.DataMapper'

@InputType()
export default class BookCreate extends Book {
  @Field()
  public name: string
}
