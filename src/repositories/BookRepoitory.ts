import {
  DeepPartial,
  EntityRepository,
  FindConditions,
  Repository
} from 'typeorm'

import Book from '../entities/Book.DataMapper'

@EntityRepository(Book)
export default class BookRepository extends Repository<Book> {
  async createAndReturn(data: DeepPartial<Book>): Promise<DeepPartial<Book>> {
    const book = this.create(data)
    const registry = await this.save(book)

    const { id, name, createdAt, updatedAt } = registry

    return {
      id,
      name,
      createdAt,
      updatedAt
    }
  }

  async updateAndReturn(
    criteria: FindConditions<Book>,
    data: DeepPartial<Book>
  ): Promise<Book> {
    const result = await this.createQueryBuilder()
      .update(Book)
      .set(data)
      .where(criteria)
      .returning('*')
      .execute()

    const { id, name, created_at, updated_at } = result.raw[0]

    const book = new Book()
    book.id = id
    book.name = name
    book.createdAt = created_at
    book.updatedAt = updated_at

    return book
  }
}
