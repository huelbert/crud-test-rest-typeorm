import { Field, InputType } from 'type-graphql'

import Book from './Book.DataMapper'

@InputType()
export default class BookUpdate implements Partial<Book> {
  @Field({ nullable: true })
  public name?: string
}
