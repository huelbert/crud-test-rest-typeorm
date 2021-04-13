import { Request, Response } from 'express'

import Book from '../entities/Book.ActiveRecord'

export default class BookController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await Book.find({
        select: ['id', 'name', 'createdAt', 'updatedAt']
      })
    )
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const book = await Book.findOne(req.params.id, {
      select: ['id', 'name', 'createdAt', 'updatedAt']
    })

    return res.status(book ? 200 : 404).json(book)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const body: Book = req.body
    const book = Book.create(body)
    const doc = await Book.save(book)

    const { id, name, createdAt, updatedAt } = doc

    return res.status(201).json({
      id,
      name,
      createdAt,
      updatedAt
    })
  }

  static async update(req: Request, res: Response): Promise<Response> {
    await Book.update(req.params.id, req.body)
    const book = await Book.findOne(req.params.id, {
      select: ['id', 'name', 'createdAt', 'updatedAt']
    })

    return res.status(book ? 200 : 404).json(book)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await Book.delete(req.params.id)

    return res.json(result)
  }
}
