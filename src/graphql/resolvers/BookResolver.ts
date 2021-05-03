import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { getRepository } from 'typeorm'

import Book from '../../entities/Book.DataMapper'
import BookCreate from '../../entities/BookCreate'
import BookUpdate from '../../entities/BookUpdate'
import Result from '../../entities/Result'

@Resolver()
export default class BookResolver {
  private readonly bookRepo = getRepository(Book)

  @Query(() => [Book])
  public async books(): Promise<Book[]> {
    return this.bookRepo.find()
  }

  @Query(() => Book, { nullable: true })
  public async book(
    @Arg('id', () => ID) id: string
  ): Promise<Book | undefined> {
    return this.bookRepo.findOne(id)
  }

  @Mutation(() => Book)
  public async createBook(@Arg('book') input: BookCreate): Promise<Book> {
    const book = this.bookRepo.create(input)
    return this.bookRepo.save(book)
  }

  @Mutation(() => Book, { nullable: true })
  public async updateBook(
    @Arg('id', () => ID) id: string,
    @Arg('book') input: BookUpdate
  ): Promise<Book | undefined> {
    await this.bookRepo.update({ id }, input)
    return this.bookRepo.findOne({ id })
  }

  @Mutation(() => Result)
  public async deleteBook(@Arg('id', () => ID) id: string): Promise<Result> {
    const result = await this.bookRepo.delete(id)

    return { status: !!result.affected }
  }
}
