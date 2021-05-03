import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import Book from '../entities/Book.DataMapper'

export default class BookController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await getManager().find(Book, {
        select: ['id', 'name', 'createdAt', 'updatedAt']
      })
    )
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const book = await getManager().findOne(Book, req.params.id, {
      select: ['id', 'name', 'createdAt', 'updatedAt']
    })

    return res.status(book ? 200 : 404).json(book)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const manager = getManager()
    const book = manager.create(Book, req.body)
    const doc = await manager.save(Book, book)

    const { id, name, createdAt, updatedAt } = doc

    return res.status(201).json({
      id,
      name,
      createdAt,
      updatedAt
    })
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const manager = getManager()
    await manager.update(Book, req.params.id, req.body)
    const book = await manager.findOne(Book, req.params.id, {
      select: ['id', 'name', 'createdAt', 'updatedAt']
    })

    return res.status(book ? 200 : 404).json(book)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getManager().delete(Book, req.params.id)

    return res.json(result)
  }
}
