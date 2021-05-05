import { Request, Response } from 'express'
import { createQueryBuilder } from 'typeorm'

import Book from '../entities/Book.DataMapper'
import uuid from '../utils/uuid'

export default class BookController {
  static async index(req: Request, res: Response): Promise<Response> {
    const books = await createQueryBuilder()
      .select(['books.id', 'books.name', 'books.createdAt', 'books.updatedAt'])
      .from(Book, 'books')
      .getMany()

    return res.json(books)
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const book = await createQueryBuilder()
      .select(['book.id', 'book.name', 'book.createdAt', 'book.updatedAt'])
      .from(Book, 'book')
      .where('book.id = :id', { id: req.params.id })
      .getOne()

    return res.status(book ? 200 : 404).json(book)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const result = await createQueryBuilder()
      .insert()
      .into(Book)
      .values({
        ...req.body,
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning(['id', 'name', 'createdAt', 'updatedAt'])
      .execute()

    const book = result.generatedMaps[0]

    return res.status(201).json(book)
  }

  static async update(req: Request, res: Response): Promise<Response> {
    await createQueryBuilder()
      .update(Book)
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute()

    const book = await createQueryBuilder()
      .select(['book.id', 'book.name', 'book.createdAt', 'book.updatedAt'])
      .from(Book, 'book')
      .where('book.id = :id', { id: req.params.id })
      .getOne()

    return res.status(book ? 200 : 404).json(book)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await createQueryBuilder()
      .delete()
      .from(Book)
      .where('id = :id', { id: req.params.id })
      .execute()

    return res.json(result)
  }
}
