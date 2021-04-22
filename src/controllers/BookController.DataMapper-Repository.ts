import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Book from '../entities/Book.DataMapper'

export default class BookController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await getRepository(Book).find({
        select: ['id', 'name', 'createdAt', 'updatedAt']
      })
    )
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const book = await getRepository(Book).findOne(req.params.id, {
      select: ['id', 'name', 'createdAt', 'updatedAt']
    })

    return res.status(book ? 200 : 404).json(book)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const body: Book = req.body
    const repository = getRepository(Book)
    const book = repository.create(body)
    const doc = await repository.save(book)

    const { id, name, createdAt, updatedAt } = doc

    return res.status(201).json({
      id,
      name,
      createdAt,
      updatedAt
    })
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Book)
    await repository.update(req.params.id, req.body)
    const book = await repository.findOne(req.params.id, {
      select: ['id', 'name', 'createdAt', 'updatedAt']
    })

    return res.status(book ? 200 : 404).json(book)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getRepository(Book).delete(req.params.id)

    return res.json(result)
  }
}
